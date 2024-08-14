const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS files to CSS
function compileSCSS() {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
}

// Watch SCSS and HTML files for changes
function watchFiles() {
  gulp.watch('./src/scss/**/*.scss', compileSCSS);
  gulp.watch('./public/*.html').on('change', browserSync.reload);
}

// Initialize BrowserSync
function browserSyncInit(done) {
  browserSync.init({
    proxy: 'http://localhost:3000', // Proxy to express server
    port: 3000, // BrowserSync port
    open: false
  });
  done();
}

// Default task
exports.default = gulp.series(compileSCSS, browserSyncInit, watchFiles);
