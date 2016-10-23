'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge2');

var lodashFullPath = 'node_modules/lodash/lodash.js';

var tempDir = '.tmp';
var distDir = 'dist';


function fullPath(path, file) {
	return path + '/' + file;
}

function createTSProject(target, declaration, out) {
	var tsProject = $.typescript.createProject({
		target: target,
		declaration: declaration,
		noImplicitAny: true,
		out: out
	});
	return tsProject;
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

var srcOpts = {
	inPath: 'src/**/*.ts',
	outDefPath: tempDir + '/src',
	outDefFile: 'typemoq.d.ts',
	outJsPath: tempDir + '/src',
	outJsFile: 'typemoq.js',
	outDefFullPath: function () {
		var result = fullPath(this.outDefPath, this.outDefFile);
		return result;
	},
	outJsFullPath: function () {
		var result = fullPath(this.outJsPath, this.outJsFile);
		return result;
	},
	outJsBundleFullPath: function () {
		var result = fullPath(distDir, 'typemoq.js');
		return result;
	},
	compileScripts: function () {
		var tsProject = createTSProject('ES5', true, this.outJsFile);
		this.tsProject = tsProject;
		return compileTS(this);
	}
}

gulp.task('scripts:src', function () {
	return srcOpts.compileScripts();
});

gulp.task('bundle', ['scripts:src'], function () {
	return gulp.src([srcOpts.outJsFullPath()])
		.pipe($.concat('typemoq.js'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('minify', ['bundle'], function () {
	return gulp.src(srcOpts.outJsBundleFullPath())
		.pipe($.uglify())
		.pipe($.rename('typemoq-min.js'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('typemoq.node.d.ts', ['scripts:src'], function () {
	return gulp.src([srcOpts.outDefFullPath(), 'typemoq.node.d.txt'])
		.pipe($.concat('typemoq.node.d.ts'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('extras', function () {
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
	return gulp.src(testOpts.outJsFullPath(), {read: false})
		.pipe($.mocha({
			ui: 'bdd',
			reporter: 'spec'
		}))
		.on('error', function (e) {
			throw e;
		});
});

gulp.task('test:mochaES6', ['scripts:src', 'scripts:testES6'], function () {
	return gulp.src(testES6Opts.outJsFullPath(), {read: false})
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
	return testOpts.compileScripts()
		.pipe($.addSrc([
			lodashFullPath,
			srcOpts.outJsFullPath()
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
	return testOpts.compileScripts()
		.pipe($.addSrc([
			lodashFullPath,
			srcOpts.outJsFullPath()
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

var testOpts = {
	inPath: 'test/**/*.ts',
	outDefPath: tempDir + '/test',
	outDefFile: 'typemoq.test.d.ts',
	outJsPath: tempDir + '/test',
	outJsFile: 'typemoq.test.js',
	outJsFullPath: function () {
		var result = fullPath(this.outJsPath, this.outJsFile);
		return result;
	},
	compileScripts: function () {
		var tsProject = createTSProject('ES5', false, this.outJsFile);
		this.tsProject = tsProject;
		return compileTS(this);
	}
};

gulp.task('scripts:test', function () {
	return testOpts.compileScripts();
});

var testES6Opts = {
	inPath: 'test/**/*.ts',
	outDefPath: tempDir + '/test',
	outDefFile: 'typemoq.test_es6.d.ts',
	outJsPath: tempDir + '/test',
	outJsFile: 'typemoq.test_es6.js',
	outJsFullPath: function () {
		var result = fullPath(this.outJsPath, this.outJsFile);
		return result;
	},
	compileScripts: function () {
		var tsProject = createTSProject('ES6', false, this.outJsFile);
		this.tsProject = tsProject;
		return compileTS(this);
	}
};

gulp.task('scripts:testES6', function () {
	return testES6Opts.compileScripts();
});

gulp.task('build', ['minify'], function () {
	runSequence('typemoq.node.d.ts', 'extras');
});

gulp.task('default', ['clean'], function () {
	runSequence('test:karma', 'build', 'test:mocha', 'test:mochaES6');
});

gulp.task('watch', ['test:ci'], function () {
	gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['test:ci']);
});
