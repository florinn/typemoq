'use strict';

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge2');
var dts = require('dts-bundle');
var karma = require('karma');

var tempDir = '.tmp';
var distDir = 'dist';

function fullPath(path, file) {
	return path + '/' + file;
}

function createTSProject(tsproject, settings) {
	var tsProject = $.typescript.createProject(tsproject, settings);
	return tsProject;
}

function compileTS(opts) {
	var tsResult = opts.tsProject.src()
					   .pipe($.sourcemaps.init())
					   .pipe(opts.tsProject($.typescript.reporter.fullReporter(true)));
	return merge([
		tsResult.dts
				.pipe(gulp.dest(opts.outDefPath)),
		tsResult.js
				.pipe($.sourcemaps.write('.'))
				.pipe(gulp.dest(opts.outJsPath))
	]);
}

var srcOpts = {
	outBundlePath: tempDir + '/src',
	outJsBundleFullPath: function () {
		var result = fullPath(this.outBundlePath, this.outJsFile);
		return result;
	},
	outJsMapBundleFullPath: function () {
		var result = fullPath(this.outBundlePath, this.outJsMapFile);
		return result;
	},
	outDefBundleFullPath: function () {
		var result = fullPath(this.outBundlePath, this.outDefFile);
		return result;
	},
	outJsPath: tempDir + '/src' + '/js',
	outJsFile: 'typemoq.js',
	outJsMapFile: 'typemoq.js.map',
	outJsMapFullPath: function () {
		var result = fullPath(this.outJsPath, this.outJsMapFile);
		return result;
	},
	outDefPath: tempDir + '/src' + '/dts',
	outDefFile: 'typemoq.d.ts',
	outDefFullPath: function () {
		var result = fullPath(this.outDefPath, this.outDefFile);
		return result;
	},
	compileScripts: function () {
		var tsProject = createTSProject('./src/tsconfig.json');
		this.tsProject = tsProject;
		return compileTS(this);
	}
};

var testOpts = {
	outBundlePath: tempDir + '/test',
	outJsBundleFullPath: function () {
		var result = [this.outBundlePath + '/Mock.test.js', this.outBundlePath + '/GlobalMock.test.js'];
		return result;
	},
	outJsPath: tempDir + '/test' + '/js',
	outDefPath: tempDir + '/test' + '/dts',
	compileScripts: function () {
		var tsProject = createTSProject('./test/tsconfig.json');
		this.tsProject = tsProject;
		return compileTS(this);
	}
};

var testES6Opts = {
	outBundlePath: tempDir + '/test.es6',
	outJsBundleFullPath: function () {
		var result = [this.outBundlePath + '/Mock.test.js', this.outBundlePath + '/GlobalMock.test.js'];
		return result;
	},
	outJsPath: tempDir + '/test.es6' + '/js',
	outDefPath: tempDir + '/test.es6' + '/dts',
	compileScripts: function () {
		var tsProject = createTSProject('./test/tsconfig.json', { target: 'es6' });
		this.tsProject = tsProject;
		return compileTS(this);
	}
};

gulp.task('compile:src', function () {
	return srcOpts.compileScripts();
});

gulp.task('dts-bundle:src', function () {
	return dts.bundle({
			name: 'typemoq-dts-bundle',
			main: srcOpts.outDefPath + '/typemoq.d.ts',
			emitOnIncludedFileNotFound: true,
			emitOnNoIncludedFileNotFound: true
		});
});

gulp.task('copy-dts-bundle:src', ['dts-bundle:src'], function () {
	return gulp.src([srcOpts.outDefPath + '/typemoq-dts-bundle.d.ts'])
		.pipe($.replace('typemoq-dts-bundle', 'typemoq'))
		.pipe($.rename('typemoq.d.ts'))
		.pipe(gulp.dest(srcOpts.outBundlePath))
		.pipe($.size());
});

gulp.task('rollup:src', function () {
	return runRollup(
		srcOpts.outJsPath + '/**/*.js',
		{
			entry: srcOpts.outJsPath + '/typemoq.js',
			useStrict: false,
			moduleName: 'TypeMoq',
			globals: {
				'circular-json': 'CircularJSON',
				'lodash': '_'
  			}
		},
		srcOpts.outBundlePath
	);
});

gulp.task('scripts:src', function (cb) {
	runSequence('compile:src', 'copy-dts-bundle:src', 'rollup:src', cb);
});

gulp.task('compile:test', function () {
	return testOpts.compileScripts();
});

gulp.task('rollup:test', function () {
	return runRollup(
		testOpts.outJsPath + '/**/*.js',
		{
			entry: [ testOpts.outJsPath + '/Mock.test.js', testOpts.outJsPath + '/GlobalMock.test.js' ],
			useStrict: true,
			moduleName: 'TypeMoqTests',
			globals: {
				typemoq: 'TypeMoq',
				chai: 'chai'
  			}
		},
		testOpts.outBundlePath
	);
});

gulp.task('scripts:test', function (cb) {
	runSequence('compile:test', 'rollup:test', cb);
});

gulp.task('compile:test.es6', function () {
	return testES6Opts.compileScripts();
});

gulp.task('rollup:test.es6', function () {
	return runRollup(
		testES6Opts.outJsPath + '/**/*.js',
		{
			entry: [ testES6Opts.outJsPath + '/Mock.test.js', testES6Opts.outJsPath + '/GlobalMock.test.js' ],
			useStrict: true,
			moduleName: 'TypeMoqTests',
			globals: {
				typemoq: 'TypeMoq',
				chai: 'chai'
  			}
		},
		testES6Opts.outBundlePath
	);
});

function runRollup(srcPath, rollupOpts, destPath) {
	return gulp.src(srcPath)
    	.pipe($.sourcemaps.init({loadMaps: true}))
		.pipe($.rollup({
        	entry: rollupOpts.entry,
			sourceMap: true,
			useStrict: rollupOpts.useStrict,
			format: 'umd',
			moduleName: rollupOpts.moduleName,
			globals: rollupOpts.globals
      	}))
    	.pipe($.sourcemaps.write('.'))
    	.pipe(gulp.dest(destPath));
}

gulp.task('scripts:test.es6', function (cb) {
	runSequence('compile:test.es6', 'rollup:test.es6', cb);
});

gulp.task('test:karma', function (cb) {
	return runKarma('karma.conf.js', cb);
});

gulp.task('test:sauce', function (cb) {
	return runKarma('karma.conf-ci.js', cb);
});

function runKarma(karmaConf, done) {
	return new karma.Server({
			configFile: __dirname + '/' + karmaConf,
			singleRun: true
		}, function () {
			done();
		}).start();
}

gulp.task('test:mocha', function () {
	return runMocha(testOpts.outJsBundleFullPath());
});

gulp.task('test:mocha.es6', function () {
	return runMocha(testES6Opts.outJsBundleFullPath());
});

function runMocha(srcPath) {
	return gulp.src(srcPath)
		.pipe($.spawnMocha({ 
			ui: 'bdd', 
			reporter: 'spec',
			env: {'NODE_PATH': './.tmp/src'}
		}))
		.on('error', function (e) {
			throw e;
		});
}

gulp.task('2dist', function () {
	return gulp.src(
		[srcOpts.outJsBundleFullPath(), srcOpts.outJsMapBundleFullPath(), srcOpts.outDefBundleFullPath()])
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('minify', ['2dist'], function () {
	return gulp.src(srcOpts.outJsBundleFullPath())
		.pipe($.uglify())
		.pipe($.rename('typemoq-min.js'))
		.pipe(gulp.dest(distDir))
		.pipe($.size());
});

gulp.task('extras', function () {
	return gulp.src(['LICENSE', 'README.md'], { dot: true })
		.pipe(gulp.dest(distDir));
});

gulp.task('changelog', function () {
	return gulp.src('CHANGELOG.md', {
		buffer: false
	})
		.pipe($.conventionalChangelog({
			preset: 'angular'
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('clean', function (cb) {
	del([tempDir, distDir], cb);
});

gulp.task('build', ['clean'], function (cb) {
	runSequence('scripts:src', 'scripts:test', 'scripts:test.es6', 'minify', cb);
});

gulp.task('default', ['build'], function (cb) {
	runSequence('test:karma', 'test:mocha', 'test:mocha.es6', cb);
});

gulp.task('release', ['default'], function (cb) {
	runSequence('changelog', cb);
});

gulp.task('test:travis', ['build'], function (cb) {
	runSequence('test:sauce', 'test:mocha', 'test:mocha.es6', cb);
});
