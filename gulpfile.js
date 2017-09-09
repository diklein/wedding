// Gulp tasks for JKL Tachyons

// Default plugins
// var gulp = require('gulp'),
//     gutil = require('gulp-util'),
//     basswork = require('gulp-basswork'),
//     watch = require('gulp-watch'),
//     prefix = require('gulp-autoprefixer'),
//     //uncss = require('gulp-uncss'),
//     minifyCSS = require('gulp-minify-css'),
//     //sass = require('gulp-sass'),
//     size = require('gulp-size'),
//     rename = require('gulp-rename'),
//     csslint = require('gulp-csslint'),
//     css = require('css'),
//     browserSync = require('browser-sync'),
//     browserReload = browserSync.reload;

// DE plugins
var gulp         = require('gulp');
var util         = require('util');
var postcss      = require('gulp-postcss');
var cssnext      = require('postcss-cssnext');
var nano         = require('gulp-cssnano');
var shell        = require('gulp-shell');
var autoprefixer = require('gulp-autoprefixer');
var atImport     = require('postcss-import');
var cp           = require('child_process');
var browserSync  = require('browser-sync').create();
var htmlmin      = require('gulp-html-minifier');

var processors = [
  atImport,
  cssnext({
    'browsers': ['last 2 version'],
    'features': {
      'customProperties': {
        preserve: true,
        appendVariables: true
      },
      'colorFunction': true,
      'customSelectors': true,
      'sourcemap': true,
      'rem': false
    }
  })
];

// Default gulp.task
// gulp.task('css', function() {
//   gulp.src('./src/jkl-tachyons.css')
//     .pipe(basswork())
//     .pipe(size({gzip: false, showFiles: true, title:'basswork css'}))
//     .pipe(size({gzip: true, showFiles: true, title:'basswork gzipped css'}))
//     .pipe(gulp.dest('./css'))
//     .pipe(minifyCSS())
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(size({gzip: false, showFiles: true, title:'basswork minified'}))
//     .pipe(size({gzip: true, showFiles: true, title:'basswork minified'}))
//     .pipe(gulp.dest('./css'));
// });

gulp.task('styles', function() {
  return gulp.src(['./_assets/src/style.css'])
  .pipe(postcss(processors))
  .pipe(nano({discardComments: {removeAll: true}}))
  .pipe(gulp.dest('./_assets/css'));
});

gulp.task('buildSite', shell.task('bundle exec jekyll build --incremental'));

gulp.task('minify', ['buildSite'], function() {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({
      collapseWhiteSpace: true,
      removeTagWhitespace: true,
      lint: true,
      minifyJS: true
      }))
    .pipe(gulp.dest('_site'));
});

gulp.task('jekyll-build', shell.task(['bundle exec jekyll build --incremental --watch']));
gulp.task('jekyll-build-once', ['buildSite', 'minify']);


gulp.task('jekyll-serve', function() {
  browserSync.init({ server: { baseDir: '_site/' } });
  gulp.watch('./_assets/src/*.css', ['styles']);
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['jekyll-build', 'jekyll-serve', 'styles']);
gulp.task('build', ['styles', 'jekyll-build-once']);


// Default setup
// gulp.task('browser-sync', function() {
//     browserSync.init(null, {
//         server: {
//             baseDir: "./_site/"
//         }
//     });
// });
//
// gulp.task('bs-reload', function () {
//     browserSync.reload();
// });
//
// gulp.task('default', ['css', 'bs-reload', 'browser-sync'], function(){
//   gulp.start(['css', 'bs-reload']);
//   gulp.watch('src/*', ['css']);
//   gulp.watch(['*.html', './**/*.html'], ['bs-reload']);
// });
