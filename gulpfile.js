
var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');

var build = require('./src/build');

gulp.task('build', function() {
  var data = require('./src/data');
  build(data);
});


gulp.task('js', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });
  gulp.src('./src/app.js')
    .pipe(browserified)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./js'));
});


gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver());
});

gulp.task('dev', ['build', 'js', 'serve'], function() {
  gulp.watch(
    ['./src/**/*'],
    ['build', 'js']
  );
});

gulp.task('default', ['dev']);

