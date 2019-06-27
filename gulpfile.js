'use strict'

const gulp = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')
const rename = require('gulp-rename')

// 开发辅助环境
function buildRed () {
  return gulp.src('./src/style/red.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./theme/red'))
}

function concatRed () {
  return gulp.src(['./theme/red/index.css', './theme/red/red.css'])
    .pipe(concat('index.css'))
    .pipe(cssmin())
    .pipe(rename({ basename: 'index', suffix: '.min' }))
    .pipe(gulp.dest('./theme/red'))
}

function buildBlue () {
  return gulp.src('./src/style/blue.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./theme/blue/'))
}

function concatBlue () {
  return gulp.src(['./theme/blue/index.css', './theme/blue/blue.css'])
    .pipe(concat('index.css'))
    .pipe(cssmin())
    .pipe(rename({ basename: 'index', suffix: '.min' }))
    .pipe(gulp.dest('./theme/blue'))
}

function buildGreen () {
  return gulp.src('./src/style/green.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./theme/green/'))
}

function concatGreen () {
  return gulp.src(['./theme/green/index.css', './theme/green/green.css'])
    .pipe(concat('index.css'))
    .pipe(cssmin())
    .pipe(rename({ basename: 'index', suffix: '.min' }))
    .pipe(gulp.dest('./theme/green'))
}

gulp.task('watch', function () {
  gulp.watch(['./theme/**/index.css', 'src/style/*.less'], gulp.parallel(
    gulp.series(buildRed, concatRed),
    gulp.series(buildBlue, concatBlue),
    gulp.series(buildGreen, concatGreen)))
})

// 将文件移动到对应的 public 目录

function moveFontsFile () {
  return gulp.src('./theme/red/fonts/**').pipe(gulp.dest('./public/theme/fonts'))
}

function moveRedFile () {
  return gulp.src('./theme/red/index.min.css')
    .pipe(rename({ basename: 'red.min' }))
    .pipe(gulp.dest('./public/theme'))
}

function moveBlueFile () {
  return gulp.src('./theme/blue/index.min.css')
    .pipe(rename({ basename: 'blue.min' }))
    .pipe(gulp.dest('./public/theme'))
}

function moveGreenFile () {
  return gulp.src('./theme/green/index.min.css')
    .pipe(rename({ basename: 'green.min' }))
    .pipe(gulp.dest('./public/theme'))
}

gulp.task('build', gulp.parallel(
  gulp.series(buildRed, concatRed, moveFontsFile, moveRedFile),
  gulp.series(buildBlue, concatBlue, moveBlueFile),
  gulp.series(buildGreen, concatGreen, moveGreenFile))
)
