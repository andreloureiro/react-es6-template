var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('connect', function() {
	connect.server({
		root: './dist',
		livereload: true
	});
});

gulp.task('js', function() {
	browserify({
		entries: 'src/js/App.jsx',
		extensions: ['.jsx', '.js'],
		debug: true
	})
	.transform(babelify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(buffer())
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
});

gulp.task('html', function() {
	gulp.src(['src/**/*.html'])
	.pipe(gulp.dest('dist'))
	.pipe(connect.reload());
});

gulp.task('clean', function() {
	gulp.src('dist')
		.pipe(clean());
});

gulp.task('watch', function() {
	gulp.watch(['src/**/*.html'], ['html']);
	gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['js']);
});

gulp.task('default', ['js', 'html', 'connect', 'watch']);