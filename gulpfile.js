'use strict';

var gulp = require('gulp');
var bump = require('gulp-bump');
var tag_version = require('gulp-tag-version');
var git = require('gulp-git');

gulp.task('bump', function () {
	var options = {
		type: 'minor'
	};
	gulp.src('./package.json')
		.pipe(bump(options))
		.pipe(gulp.dest('./'))
		.pipe(tag_version())
		.pipe(git.commit('bumps package version'));
});

gulp.task('patch', function () {
	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./'))
		.pipe(tag_version())
		.pipe(git.commit('patch package version'));
});

gulp.task('default', ['patch']);
