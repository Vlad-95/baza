'use strict';

var gulp = require('gulp'),
	rimRaf = require('rimraf'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	rigger = require('gulp-rigger'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	plumber = require('gulp-plumber'),
	sync = require('browser-sync'),
	imgMin = require('gulp-imagemin'),
	cssMin = require('gulp-clean-css'),
	preFixer = require('gulp-autoprefixer'),
	reload = sync.reload;

var path = {

	build: {
		html: 'build/',
		php: 'build/',
		js: 'build/js/',
		css: 'build/css/',
		img: 'build/img/',
		fonts: 'build/fonts/',
		bower: 'build/bower/'
	},
	src: {
		html: 'src/*.html',
		php: 'src/*.php',
		js: 'src/js/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*',
		fonts: 'src/fonts/**/*',
		bower: 'src/bower/**/*'
	},
	watch: {
		html: 'src/**/*.html',
		php: 'src/*.php',
		js: 'src/js/**/*.js',
		style: 'src/style/**/*.scss',
		img: 'src/img/**/*',
		fonts: 'src/fonts/**/*',
		bower: 'src/bower/**/*'
	},
	clean: './build'
};

gulp.task('webserver', function () {
	sync({
		server: {
			baseDir: path.clean
		},
		port: 8080,
		open: true,
		notify: false
	});
});

gulp.task('html:build', function () {
	return gulp.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html));
});

gulp.task('php:build', function () {
	return gulp.src(path.src.php)
		.pipe(gulp.dest(path.build.php));
});

gulp.task('style:build', function () {
	gulp.src(path.src.style)
		.pipe(plumber(function(error) {
			return true;
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(preFixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.build.css))
		.pipe(reload({stream: true}))
		.pipe(rename(function (path) {
			path.basename += "-min";
		}))
		.pipe(cssMin())
		.pipe(gulp.dest(path.build.css));

	return gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img));
});

gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(gulp.dest(path.build.js))
		.pipe(plumber())
		.pipe(uglify())
		.pipe(rename(function (path) {
			path.basename += "-min";
		}))
		.pipe(gulp.dest(path.build.js));


});

gulp.task('fonts:build', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
});


gulp.task('imgMin', function () {
	gulp.src(path.src.img)
		.pipe(imgMin())
		.pipe(gulp.dest(path.build.img));
});

gulp.task('clear', function (callback) {
	rimRaf(path.clean, callback);
});

gulp.task('build', gulp.series('clear', 'html:build', 'php:build', 'style:build', 'js:build', 'js:build', 'fonts:build'));

gulp.task('watch', function () {
	watch([path.watch.html], gulp.series('html:build'));
	watch([path.watch.php], gulp.series('php:build'));
	watch([path.watch.style], gulp.series('style:build'));
	watch([path.watch.js], gulp.series('js:build'));
	watch([path.watch.fonts], gulp.series('fonts:build'));
});

gulp.task('default', gulp.parallel('build', 'webserver', 'watch'));
