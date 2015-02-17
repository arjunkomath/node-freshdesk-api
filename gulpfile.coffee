gulp = require 'gulp'
gutil = require 'gulp-util'
plumber = require 'gulp-plumber'
coffee = require 'gulp-coffee'

project =
  src: 'src/**/*.coffee'
  dest: 'lib/'

showError = (err) ->
  gutil.beep()
  gutil.log gutil.colors.red err.message or err

gulp.task 'build', ->
  gulp.src(project.src)
    .pipe(plumber({errorHandler: showError}))
    .pipe(coffee(bare: true).on('error', gutil.log))
    .pipe(gulp.dest(project.dest))

gulp.task 'default', ['build']
