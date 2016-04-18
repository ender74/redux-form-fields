var gulp  = require('gulp')
var babel = require('gulp-babel')
var eslint = require('gulp-eslint')

gulp.task('default', function () {
    return gulp.src('./src/**')
        .pipe(babel())
        .pipe(gulp.dest('./lib'))
})

gulp.task('lint', function() {
  return gulp.src('src/**')
      .pipe(eslint({
        'parser': 'babel-eslint'
      }))
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
})