/* eslint-disable no-console */
/* eslint-disable camelcase */
'use strict'

const { src, dest, watch, task, series } = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')
const rename = require('gulp-rename')

let buildSrcStyle_path
// 将 src/style 中的 less 文件编译为 css 文件，并将生成文件输出到对应的 theme 文件夹下
function buildSrcStyle () {
  const currentPath = buildSrcStyle_path || '*'
  // watch 的时候打印对应主题色，比如红色就是 red_themeConcat，gulp build的时候打印 *_buildSrcStyle
  console.log(currentPath + '_buildSrcStyle')
  return src(`./src/style/${currentPath}.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(dest(function (file) {
      return `./theme/${file.stem}`
    }))
}

task('buildSrcStyle', series(buildSrcStyle))

let themeConcat_path
// 将 theme 文件夹下某个主题色中的 css 文件合并
function themeConcat () {
  if (!themeConcat_path) {
    return false
  } else {
    // watch 的时候打印对应主题色，比如红色就是 red_themeConcat
    console.log(themeConcat_path + '_themeConcat')
    return src([`./theme/${themeConcat_path}/index.css`, `./theme/${themeConcat_path}/${themeConcat_path}.css`])
      .pipe(concat('index.css'))
      .pipe(cssmin())
      .pipe(rename({ basename: 'index', suffix: '.min' }))
      .pipe(dest(`./theme/${themeConcat_path}`))
  }
}

task('themeConcat', series(themeConcat))

task('watch', function () {
  const watcher = watch(['./theme/**/index.css', 'src/style/*.less'])
  const needWatcher = 'red'
  const watcherPath = watch(`./theme/**/${needWatcher}.css`)

  watcher.on('change', function (path) {
    if (path.indexOf('.less') > -1) {
      buildSrcStyle_path = path.split('\\')[2].split('.')[0]
      buildSrcStyle()
    } else {
      themeConcat_path = path.split('\\')[1]
      themeConcat()
    }
  })

  watcherPath.on('change', function (path) {
    themeConcat_path = path.split('\\')[1]
    themeConcat()
  })
})

// 移动字体文件，只需要一种样式下的字体文件就可以了
let fonts_path = 'red'
function moveFontsFile () {
  return src(`./theme/${fonts_path}/fonts/**`).pipe(dest('./public/theme/fonts'))
}

let move_path = ['red', 'green', 'blue']

// 将所有主题色相关文件合并
function allThemeConcat () {
  let stream
  move_path.forEach(element => {
    themeConcat_path = element
    stream = src([`./theme/${themeConcat_path}/index.css`, `./theme/${themeConcat_path}/${themeConcat_path}.css`])
      .pipe(concat('index.css'))
      .pipe(cssmin())
      .pipe(rename({ basename: 'index', suffix: '.min' }))
      .pipe(dest(`./theme/${themeConcat_path}`))
  })
  return stream
}

// 将文件移动到对应的 public 目录
function moveFile () {
  let stream
  move_path.forEach(element => {
    stream = src(`./theme/${element}/index.min.css`)
      .pipe(rename({ basename: `${element}.min` }))
      .pipe(dest('./public/theme'))
  })
  return stream
}

task('build', series(
  buildSrcStyle,
  allThemeConcat,
  moveFontsFile,
  moveFile
))
