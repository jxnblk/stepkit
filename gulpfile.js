
var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var basswork = require('gulp-basswork');
var webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('./src/js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./js'));
});

gulp.task('css', function() {
  gulp.src('./src/css/base.css')
    .pipe(basswork())
    .pipe(gulp.dest('./css'));
});

gulp.task('serve', function() {
  gulp.src('./**/*')
    .pipe(webserver({
    }));
});

gulp.task('dev', ['js', 'css', 'serve'], function() {
  gulp.watch(
    ['./src/**/*'],
    ['js', 'css']
  );
});

gulp.task('default', ['dev']);

