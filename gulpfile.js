'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge2');

var underscoreFullPath = 'node_modules/underscore/underscore.js';

var tempDir = '.tmp';
var distDir = 'dist';


gulp.task('scripts:src', function () {
	return compileSrcScripts();
});

function createTSProject(target, declaration, out) {
	var tsProject = $.typescript.createProject({
		target: target,
		declaration: declaration,
		noImplicitAny: true,
		out: out
	});
	return tsProject;
}

function compileSrcScripts() {
	compileSrcScripts.prototype.opts = {
		inPath: 'src/**/*.ts',
		outDefPath: tempDir + '/src',
		outDefFile: 'typemoq.d.ts',
		outJsPath: tempDir + '/src',
		outJsFile: 'typemoq.js'
	};
	
	var tsProject = createTSProject('ES5', true, compileSrcScripts.prototype.opts.outJsFile);
	
	compileSrcScripts.prototype.opts.tsProject = tsProject;

	return compileTS(compileSrcScripts.prototype.opts);
}

function compileTS(opt) {
	var tsResult = gulp.src(opt.inPath)
					   .pipe($.sourcemaps.init())
					   .pipe(opt.tsProject($.typescript.reporter.fullReporter(true)));

	var refFilters = [
						/^\/\/\/\s+<reference\s+path=["']/i
						];
	return merge([
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
	]);
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

function srcOutDefFullPath() {
	var srcOpts = compileSrcScripts.prototype.opts;
	var result = fullPath(srcOpts.outDefPath, srcOpts.outDefFile);
	return result;
}

gulp.task('typemoq.node.d.ts', ['scripts:src'], function () {
	return gulp.src([srcOutDefFullPath(), 'typemoq.node.d.txt'])
		.pipe($.concat('typemoq.node.d.ts'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('extras', function () {
	var srcOpts = compileSrcScripts.prototype.opts;
	var srcOutDefAll = fullPath(srcOpts.outDefPath, '*.*');

	return gulp.src(
		[srcOutDefAll, 'LICENSE', 'README.md'], { dot: true })
		.pipe(gulp.dest(distDir));
});

gulp.task('clean', function (cb) {
	del([tempDir, distDir], cb);
});

gulp.task('test:karma', ['scripts:src'], function () {
	return runTestsWithKarma(true)
		.on('error', function (e) {
			throw e;
		});
});

gulp.task('test:ci', ['scripts:src'], function () {
	return runTestsWithKarma(false)
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

gulp.task('test:mocha', ['scripts:src', 'scripts:test'], function () {
	return gulp.src(testOutJsFullPath(), {read: false})
		.pipe($.mocha({
			ui: 'bdd',
			reporter: 'spec'
		}))
		.on('error', function (e) {
			throw e;
		});
});

gulp.task('test:mochaES6', ['scripts:src', 'scripts:testES6'], function () {
	return gulp.src(testOutJsFullPathES6(), {read: false})
		.pipe($.mocha({
			ui: 'bdd',
			reporter: 'spec'
		}))
		.on('error', function (e) {
			throw e;
		});
});

gulp.task('test:travis', ['clean'], function () {
	runSequence('test:sauce', 'build', 'test:mocha', 'test:mochaES6');
});

function runTestsWithKarma(isBlocking) {
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
	compileTestScripts.prototype.opts = {
		inPath: 'test/**/*.ts',
		outDefPath: tempDir + '/test',
		outDefFile: 'typemoq.test.d.ts',
		outJsPath: tempDir + '/test',
		outJsFile: 'typemoq.test.js'
	};

	var tsProject = createTSProject('ES5', false, compileTestScripts.prototype.opts.outJsFile);
	
	compileTestScripts.prototype.opts.tsProject = tsProject;
	
	return compileTS(compileTestScripts.prototype.opts);
}

function testOutJsFullPath() {
	var testOpts = compileTestScripts.prototype.opts;
	var result = fullPath(testOpts.outJsPath, testOpts.outJsFile);
	return result;
}

gulp.task('scripts:testES6', function () {
	return compileTestScriptsES6();
});

function compileTestScriptsES6() {
	compileTestScriptsES6.prototype.opts = {
		inPath: 'test/**/*.ts',
		outDefPath: tempDir + '/test',
		outDefFile: 'typemoq.test_es6.d.ts',
		outJsPath: tempDir + '/test',
		outJsFile: 'typemoq.test_es6.js'
	};

	var tsProject = createTSProject('ES6', false, compileTestScriptsES6.prototype.opts.outJsFile);
	
	compileTestScriptsES6.prototype.opts.tsProject = tsProject;
	
	return compileTS(compileTestScriptsES6.prototype.opts);
}

function testOutJsFullPathES6() {
	var testOpts = compileTestScriptsES6.prototype.opts;
	var result = fullPath(testOpts.outJsPath, testOpts.outJsFile);
	return result;
}

gulp.task('build', ['minify'], function () {
	runSequence('typemoq.node.d.ts', 'extras');
});

gulp.task('default', ['clean'], function () {
	runSequence('test:karma', 'build', 'test:mocha', 'test:mochaES6');
});

gulp.task('watch', ['test:ci'], function () {
	gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['test:ci']);
});
