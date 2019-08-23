const gulp = require('gulp');
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
let cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');


function compile(){
  return src('src/*js', { sourcemaps: true })
  //puts everything in one file
  .pipe(concat('main.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  //minifies js
  .pipe(uglify())
  .pipe(dest('output/'));
}
function compileCSS(){
  return src('./src/css/*.scss')
  .pipe(sourcemaps.init())
  .pipe(concat('styles.css'))
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({}))
  //enabling sourcemaps
  .pipe(sourcemaps.write('./src/css'))  
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('output/'))
}

gulp.task ('watch', function() {
  gulp.watch('src/*js', compile)
  gulp.watch('src/css/*.scss', compileCSS)
})



