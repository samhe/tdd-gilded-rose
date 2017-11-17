import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';
import runSequence from 'run-sequence';

import { getServer } from './modules/_express/server/server';

const srcFiles = ['modules/*/server/**/*.js'];
const testFiles = ['modules/*/test/**/*.test.js'];

function test() {
  // let { app, db } = getServer().getInstance();
  return gulp.src(testFiles)
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    }));
}

function server() {
  return getServer().getInstance();
}

function coverage(done) {
  gulp.src(srcFiles)
    .pipe(istanbul({ instrumenter: Instrumenter }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      return test()
      .pipe(istanbul.writeReports())
      .on('end', done);
    });
}

gulp.task('server', server);
gulp.task('test', test);
gulp.task('coverage', coverage);
gulp.task('exit', () => { getServer().getInstance().close(); process.exit(); });
gulp.task('t:s', (done) => {
  runSequence('server', 'test', 'exit', done);
});
