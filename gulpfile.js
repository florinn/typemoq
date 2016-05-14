'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var eventStream = require('event-stream');

var underscoreFullPath = 'node_modules/underscore/underscore.js';

var tempDir = '.tmp';
var distDir = 'dist';


gulp.task('scripts:src', function () {
	return compileSrcScripts();
});

function compileSrcScripts() {
	var tsProject = $.typescript.createProject({
		target: 'ES5',
		declarationFiles: true,
		noExternalResolve: false,
		sortOutput: true
	});
	
	compileSrcScripts.prototype.opts = {
		tsProject: tsProject,
		inPath: 'src/**/*.ts',
		outDefPath: tempDir + '/definitions/src',
		outDefFile: 'output.d.ts',
		outJsPath: tempDir + '/js/src',
		outJsFile: 'output.js'
	};

	return compileTS(compileSrcScripts.prototype.opts);
}

function compileTS(opt) {
	var tsResult = gulp.src(opt.inPath)
					   .pipe($.sourcemaps.init())
					   .pipe($.typescript(opt.tsProject, undefined, $.typescript.reporter.fullReporter(true)));

	var refFilters = [
						/^\/\/\/\s+<reference\s+path=["']/i
						];
	return eventStream.merge(
		tsResult.dts
				.pipe($.concatSourcemap(opt.outDefFile))
				.pipe($.deleteLines({
					'filters': refFilters
					}))
				.pipe(gulp.dest(opt.outDefPath)),
		tsResult.js
				.pipe($.concatSourcemap(opt.outJsFile))
				.pipe($.deleteLines({
					'filters': refFilters
					}))
				.pipe($.sourcemaps.write())
				.pipe(gulp.dest(opt.outJsPath))
	);
}

function fullPath(path, file) {
	return path + '/' + file;
}

function srcOutJsFullPath() {
	var srcOpts = compileSrcScripts.prototype.opts;
	var result = fullPath(srcOpts.outJsPath, srcOpts.outJsFile);
	return result;
}

function srcOutJsBundleFullPath() {
	var result = fullPath(distDir, 'typemoq.js');
	return result;
}

gulp.task('bundle', ['scripts:src'], function () {
	return gulp.src([srcOutJsFullPath()])
		.pipe($.concat('typemoq.js'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('minify', ['bundle'], function () {
	return gulp.src(srcOutJsBundleFullPath())
		.pipe($.uglify())
		.pipe($.rename('typemoq-min.js'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('extras', function () {
	var srcOpts = compileSrcScripts.prototype.opts;
	var srcOutDefAll = fullPath(srcOpts.outDefPath, '*.*');

	return gulp.src(
		['src/*.*', '!src/*.html', '!src/*.ts', '!src/*.config', '!src/*.csproj*',
			srcOutDefAll, srcOutJsBundleFullPath(), 'typemoq.node.d.ts', 'LICENSE', 'README.md'], { dot: true })
		.pipe($.rename(function (path) {
			path.basename = path.basename.replace('output', 'typemoq');
		}))
		.pipe(gulp.dest(distDir));
});

gulp.task('clean', function (cb) {
	del([tempDir, distDir], cb);
});

gulp.task('test', ['scripts:src'], function () {
	return runTests(true)
		.on('error', function (e) {
			throw e;
		});
});

gulp.task('test:ci', ['scripts:src'], function () {
	return runTests(false)
		.on('error', function (e) {
			console.log(e);
		});
});

gulp.task('test:sauce', ['scripts:src'], function () {
	return runTestsWithSauce(true)
		.on('error', function (e) {
			throw e;
		});
});

function runTests(isBlocking) {
	return compileTestScripts()
		.pipe($.addSrc([
			underscoreFullPath,
			srcOutJsFullPath()
		]))
		.pipe($.karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function (e) {
			if (isBlocking)
				throw e;
		});
}

function runTestsWithSauce(isBlocking) {
	return compileTestScripts()
		.pipe($.addSrc([
			underscoreFullPath,
			srcOutJsFullPath()
		]))
		.pipe($.karma({
			configFile: 'karma.conf-ci.js',
			action: 'run'
		}))
		.on('error', function (e) {
			if (isBlocking)
				throw e;
		});
}

gulp.task('scripts:test', function () {
	return compileTestScripts();
});

function compileTestScripts() {
	var tsProject = $.typescript.createProject({
		target: 'ES5',
		declarationFiles: false,
		noExternalResolve: false,
		sortOutput: true
	});
	
	compileTestScripts.prototype.opts = {
		tsProject: tsProject,
		inPath: 'test/**/*.ts',
		outDefPath: tempDir + '/definitions/test',
		outDefFile: 'output.test.d.ts',
		outJsPath: tempDir + '/js/test',
		outJsFile: 'output.test.js'
	};

	return compileTS(compileTestScripts.prototype.opts);
}

gulp.task('build', ['minify', 'extras']);

gulp.task('default', ['clean'], function () {
	runSequence('test', 'build');
});

gulp.task('watch', ['test:ci'], function () {
	gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['test:ci']);
});
