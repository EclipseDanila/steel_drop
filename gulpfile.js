import gulp from 'gulp';
import include from 'gulp-file-include';
import sync, { reload } from "browser-sync"
import csso  from "gulp-csso"
import htmlmin from "gulp-htmlmin"
import {deleteAsync}  from "del";
import autoprefixer from "gulp-autoprefixer"
import concat from "gulp-concat"
import jsminify from 'gulp-minify'

function html() {
  console.log('html');
  return gulp.src('src/**.html')
  .pipe(include({
    prefix: '@@'
  }))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('dist'))
}

function scss() {
  console.log('scss');
  return gulp.src(['./src/styles/**.css'])
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/assets/styles'))
}

function jsmin() {
  console.log('js minify');
  return gulp.src(['./src/scripts/**.js'])
    .pipe(jsminify())
    .pipe(gulp.dest('./dist/assets/scripts'))
}

function clear() {
  console.log('delete');
  return deleteAsync(['./dist/assets/styles', './dist/assets/scripts', './dist/**.html'])
}

function serve() {
  console.log('sync');
  sync.init({
    server: './dist'
  })

  gulp.watch('src/**.html', gulp.series(html)).on('change', sync.reload)
  gulp.watch('src/parts/**.html', gulp.series(html)).on('change', sync.reload)
  gulp.watch('src/styles/**.css', gulp.series(scss)).on('change', sync.reload)
  gulp.watch('src/scripts/**.js', gulp.series(scss)).on('change', sync.reload)
}

const _clear = clear;
export { _clear as clear };

const _html = html;
export { _html as html };

const _scss = scss;
export { _scss as scss };

const _jsmin = jsmin;
export { _jsmin as jsmin };


const _build = gulp.series(clear, html, scss, jsmin)
export { _build as build };

const _serve = gulp.series(clear, html, scss, jsmin, serve)
export { _serve as serve };

