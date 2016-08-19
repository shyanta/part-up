'use strict';

import gulp from 'gulp';
import help from 'gulp-help';
import runSequence from "run-sequence";

// provide help through "gulp help" -- the help text is the second gulp task argument (https://www.npmjs.com/package/gulp-help/)
help(gulp);

gulp.task('release-it', (done) => {
  runSequence('bump', 'changelog', 'add', 'commit', 'tag', 'push', done);
});
