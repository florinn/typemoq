'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var eventStream = require('event-stream');

gulp.task('scripts:src', function () {
	return compileSrcScripts();
});

function compileSrcScripts() {
	var tsProject = $.typescript.createProject({
		declarationFiles: true,
		noExternalResolve: false,
		sortOutput: true
	});
	
	compileSrcScripts.prototype.opts = {
		tsProject: tsProject,
		inPath: 'src/**/*.ts',
		outDefPath: '.tmp/definitions/src',
		outDefFile: 'output.d.ts',
		outJsPath: '.tmp/js/src',
		outJsFile: 'output.js'
	};

	return compileTS(compileSrcScripts.prototype.opts);
}

function compileTS(opt) {
	var tsResult = gulp.src(opt.inPath)
					   .pipe($.sourcemaps.init())
					   .pipe($.typescript(opt.tsProject, undefined, $.typescript.reporter.fullReporter(true)));

	return eventStream.merge(
		tsResult.dts
				.pipe($.concatSourcemap(opt.outDefFile))
				.pipe(gulp.dest(opt.outDefPath)),
		tsResult.js
				.pipe($.concatSourcemap(opt.outJsFile))
				.pipe($.sourcemaps.write())
				.pipe(gulp.dest(opt.outJsPath))
	);
}

gulp.task('minify', ['scripts:src'], function () {
	return gulp.src('.tmp/js/src/output.js')
		.pipe($.uglify())
		.pipe($.rename('typemoq.js'))
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

gulp.task('extras', function () {
	var defSrc = compileSrcScripts.prototype.opts.outDefPath + '/*.*';
	return gulp.src(
		['src/*.*', '!src/*.html', '!src/*.ts', '!src/*.config', '!src/*.csproj*', defSrc, 'typemoq.node.d.ts', 'LICENSE', 'README.md'], { dot: true })
		.pipe($.rename(function (path) {
		    path.basename = path.basename.replace('output', 'typemoq');
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function (cb) {
	del(['.tmp', 'dist'], cb);
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

gulp.task('test:phantomjs', ['scripts:src'], function () {
	return runTestsWithPhantomJS(true)
		.on('error', function (e) {
			throw e;
		});
});

function runTests(isBlocking) {
	return compileTestScripts()
		.pipe($.addSrc([
			'node_modules/underscore/underscore.js',
			'.tmp/js/src/output.js'
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

function runTestsWithPhantomJS(isBlocking) {
	return compileTestScripts()
		.pipe($.addSrc([
			'node_modules/underscore/underscore.js',
			'.tmp/js/src/output.js'
		]))
		.pipe($.karma({
			configFile: 'karma_phantomjs.conf.js',
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
		declarationFiles: false,
		noExternalResolve: false,
		sortOutput: true
	});
	
	compileTestScripts.prototype.opts = {
		tsProject: tsProject,
		inPath: 'test/**/*.ts',
		outDefPath: '.tmp/definitions/test',
		outDefFile: 'output.test.d.ts',
		outJsPath: '.tmp/js/test',
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
