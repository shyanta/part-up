'use strict';

import gulp from 'gulp';
import help from 'gulp-help';
import git from 'gulp-git';
import tagVersion from 'gulp-tag-version';

// provide help through "gulp help" -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp);

gulp.task('pull', function (done) {
  git.pull();
  done();
});

gulp.task('add', function () {
  return gulp.src(['./*', '!dist', '!build', '!' + path.resolve(__dirname, '../../', 'node_modules'), '!' + path.resolve(__dirname, '../../', 'bower_components'), '!'])
    .pipe(git.add());
});

gulp.task('push', function (done) {
  git.push('origin', null, { args: '--tags' });
  done();
});

gulp.task('commit', function () {
  return gulp.src(path.resolve(__dirname, '../../'))
    .pipe(git.commit('chore(release): bump package version and update changelog', { emitData: true }))
    .on('data', function (data) {
      console.log(data);
    });
});

gulp.task('tag', function () {
  return gulp.src(path.resolve(__dirname, '../../', 'package.json'))
    .pipe(tagVersion());
});
