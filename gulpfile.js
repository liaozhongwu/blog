var gulp = require("gulp")
, plumber = require("gulp-plumber")
, postcss = require("gulp-postcss")
, _import = require("postcss-import")
, nested = require("postcss-nested")
, cssnext = require("postcss-cssnext")
, url = require("postcss-url")
, clean = require('gulp-clean-css')
, babel = require("gulp-babel")
, react = require("gulp-react")
, uglify = require("gulp-uglify")
, sourcemaps = require("gulp-sourcemaps")
, empty = require("gulp-empty")
, webpack = require("webpack")
, webpack_config = require("./webpack.config")
, fs = require("fs")
, shelljs = require("shelljs")
, crypto = require("crypto")
, config = require("config")
, CDN = require("./cdn")

function cdn () {
	return url({url: CDN})
}

function sourcemaps_init () {
	if (config.debug) {
		return sourcemaps.init()
	}
	return empty()
}

function sourcemaps_write () {
	if (config.debug) {
		return sourcemaps.write(".")
	}
	return empty()
}

function css (src, dest) {
	return gulp.src(src)
		.pipe(plumber())
		.pipe(sourcemaps_init())
		.pipe(postcss([
			_import(),
			cdn(),
			nested(), 
			cssnext()
		]))
		.pipe(clean())
		.pipe(sourcemaps_write())
		.pipe(gulp.dest(dest))
}

function js (src, dest) {
	return gulp.src(src)
		.pipe(plumber())
		.pipe(sourcemaps_init())
		.pipe(babel())
		.pipe(react())
		.pipe(uglify())
		.pipe(sourcemaps_write())
		.pipe(gulp.dest(dest))
}

gulp.task("css", function () {
	return css("./src/css/*.css", "./public/css")
})

gulp.task("pagecss", function () {
	return css("./src/page/**/*.css", "./public/page")
})

gulp.task("page", function () {
	return js("./src/page/**/*.jsx", "./build/page")
})

gulp.task("component", function () {
	return js("./src/component/**/*.jsx", "./build/component")
})

gulp.task("layout", function () {
	return js("./src/layout/*.jsx", "./build/layout")
})

gulp.task("webpack", function () {
	webpack(webpack_config, function (err, stat) {})
})

gulp.task("img", function () {
	return gulp.src("./src/img/**/*").pipe(gulp.dest("./public/img"))
})

gulp.task("vendor", function () {
	return gulp.src("./src/vendor/**/*").pipe(gulp.dest("./public/vendor"))
})

gulp.task("other", function () {
	return gulp.src("./src/*.*").pipe(gulp.dest("./public"))
})

gulp.task("clean", function () {
	shelljs.rm("-r", "./build")
	shelljs.rm("-r", "./public")
})

gulp.task('watch', ["build"], function () {
  gulp.watch('./src/css/*.css', ['css'])
  gulp.watch('./src/page/**/*.jsx', ['page', 'webpack'])
  gulp.watch('./src/page/**/*.css', ['pagecss'])
  gulp.watch('./src/layout/*.jsx', ['layout', 'webpack'])
  gulp.watch('./src/component/**/*.jsx', ['component', 'webpack'])
  gulp.watch('./src/entry/*.js', ['webpack'])
})

gulp.task("build", ["clean", "css", "pagecss", "page", "component", "layout", "webpack", "img", "vendor", "other"]);

gulp.task("default", ["watch"])

gulp.task('hash', function () {
	var hash = crypto.createHash('md5').update(crypto.randomBytes(256)).digest('hex').substr(0, 6)
	fs.writeFileSync("./cdn/hash.json", JSON.stringify(hash))
})

gulp.task('deploy', ['hash', 'build'], function () {
	require("./cdn/upload.js")()
})

