import gulp from 'gulp';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';


const srcFiles = ['modules/*/server/**/*.js'];
const testFiles = ['modules/*/test/**/*.js'];

function test() {
  return gulp.src(testFiles)
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register'
    }));
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

// Run our tests as the default task
gulp.task('default', test);
gulp.task('coverage', coverage);
