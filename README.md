# test-element-theme #

Element 换肤的探索方案。

## Project setup ##

```sh
npm install
```

### Compiles and hot-reloads for development ###

```sh
npm run serve
```

### Compiles and minifies for production ###

```sh
npm run build
```

## 自定义主题色 ##

使用[命令行主题工具](https://element.eleme.cn/#/zh-CN/component/custom-theme#ming-ling-xing-zhu-ti-gong-ju)

需要在根目录下面添加 `themeCode` 和 `theme` 文件夹，`themeCode` 文件夹下面用于放 初始化变量文件 ，`theme` 文件夹下面用于放 临时css文件。

需要在src文件夹下面添加 `style` 文件夹，`style` 文件夹下面放 自定义覆盖样式 （初始化变量文件解决不了的），至于预编译器自由选定，不过需要改 gulp 内预编译器的配置。

## 使用教程 ##

### 开发环境 ###

1. `vue-cli-service serve` 打开 vue cli 的开发环境。
2. `et -i ./themeCode/element-variables-red.scss` 生成对应的主题色配置文件。
3. `et --watch --config ./themeCode/element-variables-red.scss --out ./theme/red` 观察主题色配置文件的修改并生成对应文件。
4. `gulp watch` 观察对应的文件修改，并及时编译（需要确保对应的文件存在）。
5. 在 `src/main.js` 中引入文件 `import '../theme/red/index.min.css'`。

开发不同主题色的时候需要将 `gulpfile.js` 第44行的 `const needWatcher = 'blue'` 修改为对应的主题色，例如：

```javascript
const needWatcher = 'green'
```

然后重新 `gulp watch`

### 正式环境 ###

发布前先 `gulp build` 主题色文件，然后再 `vue-cli-service build` 项目代码，当然也可以把前两步合并在一起 `gulp build && vue-cli-service build` ，不过这样每次打包时间都比较长。

打包的时候如果没有 `blue/green` 主题色的时候，可以将 `gulpfile.js` 第69行的 `let move_path = ['red', 'green', 'blue']` 中的对应代码删除，例如：

```javascript
let move_path = ['red', 'blue']
```

打包的时候可以将 `src/main.js` 中 `import '../theme/red/index.min.css'` 去除，也可以保留作为默认主题色。

## 主要思路 ##

使用 Element 官方提供的[命令行主题工具](https://element.eleme.cn/#/zh-CN/component/custom-theme#ming-ling-xing-zhu-ti-gong-ju)，并通过 `watch` 生成在 `theme` 文件夹下，在 `src/style` 下修改文件会将 `red.less` 生成为 `red.css`，再将 Element主题工具 生成的 `index.css` 和 `red.css` 合并为 `index.min.css`，再通过 gulp 将  `index.min.css` 重命名为对应的主题色名，例如 `red.min.css` ，并将 `red.min.css` 移动到 `public/theme` 文件下，最后执行 `vue-cli-service build` 的时候会将 `public/theme` 下的内容转移动 vue cli 的 `publicPath` 文件夹下。

开发环境中需要在 `src/main.js` 引入对用的css文件，如

```javascript
import '../theme/red/index.min.css'
```

正式环境中，通过为 `<link rel="stylesheet" id="themeLink" href="">` 指定 `href` 来修改主题色。

```html
<link rel="stylesheet" id="themeLink" href="">
<script>
  let environmental = '<%= NODE_ENV %>'
  let themeLink = document.querySelector('#themeLink')
  // 本例子通过修改 location.search 中的 theme 来进行切换主题色
  function getSearchArgs () {
    let args = {}
    let query = location.search.substring(1)
    let pairs = query.split("&")
    for (let i = 0;i < pairs.length; i++) {
      let pos = pairs[i].indexOf("=")
      if(pos == -1) continue
      let name = pairs[i].substring(0, pos)
      let value = pairs[i].substring(pos + 1)
      value = decodeURIComponent(value)
      args[name] = value
    }
    return args
  }
  let currentTheme = getSearchArgs().theme
  if (environmental === 'production') {
    themeLink.href = '<%= BASE_URL %>theme/' + currentTheme + '.min.css'
  }
</script>
```
