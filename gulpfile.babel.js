import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';
import runSequence from 'run-sequence';

import { getServer } from './modules/_express/server/server';

const srcFiles = ['modules/*/server/**/*.js'];
const allTestFiles = ['modules/*/test/**/*.test.js'];
const unitTests = ['modules/gilded_rose/test/*.test.js']

let testFiles = allTestFiles;
function unitTest() {
  testFiles = unitTests
}
function allTest() {
  testFiles = allTestFiles
}

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

gulp.task('type:all', allTest);
gulp.task('type:unit', unitTest);
gulp.task('test', test);
gulp.task('server', server);
gulp.task('test', test);
gulp.task('coverage', coverage);
gulp.task('exit', () => { getServer().getInstance().close(); process.exit(); });
gulp.task('test:all', done => {
  runSequence('type:all', 'server', 'test', 'exit', done);
});
gulp.task('test:unit', done => {
  runSequence('type:unit', 'coverage', done);
});
