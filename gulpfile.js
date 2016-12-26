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
		.pipe(gulp.dest('./'));
});

gulp.task('patch', function () {
	gulp.src('./package.json')
		.pipe(bump())
		.pipe(gulp.dest('./build'));
});

gulp.task('tag', function () {
	return gulp.src(['./package.json'])
		.pipe(git.commit('bumps package version'))
		.pipe(tag_version());
});

gulp.task('default', ['bump', 'tag']);
