let projectFolder = "build";
let sourceFolder = "src";

let path = {
  build: {
    html: projectFolder + "/",
    css: projectFolder + "/css/",
    js: projectFolder + "/js/",
    img: projectFolder + "/img/",
    fonts: projectFolder + "/fonts/",
  },
  src: {
    html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
    css: sourceFolder + "/sass/style.scss",
    js: sourceFolder + "/js/main.js",
    img: sourceFolder + "/img/**/*.{jpg,png,gif}",
    fonts: sourceFolder + "/fonts/*.ttf",
  },
  watch: {
    html: sourceFolder + "/**/*.html",
    css: sourceFolder + "/sass/**/*.scss",
    js: sourceFolder + "/js/**/*.js",
    img: sourceFolder + "/img/**/*.{jpg,png,gif}",
  },
  clean: "./" + projectFolder + "/"
}


let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  scss = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify-es').default, // минифицирует файлы
  imagemin = require('gulp-imagemin'),
  plumber = require('gulp-plumber'),
  rollup = require('gulp-better-rollup'),
  sourcemaps = require('gulp-sourcemaps')


function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + projectFolder + "/"
    },
    port: 3000,
    notify: false,
    open: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(plumber())
    .pipe(scss({
      outputStyle: "expanded"
    }))
    .pipe(autoprefixer({
      overrideBrowsersList: ["last 5 versions"],
      cascade: true
    }))
    .pipe(dest(path.build.css))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, 'iife'))
    // .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(sourcemaps.write(''))
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{ removeViewBox: false }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
}

function clean() {
  return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images))
let watch = gulp.parallel(build, watchFiles, browserSync)

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;
