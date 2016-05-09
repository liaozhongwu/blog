var gulp = require("gulp")
, postcss = require("gulp-postcss")
, _import = require("postcss-import")
, nested = require("postcss-nested")
, cssnext = require("postcss-cssnext")
, url = require("postcss-url")
, csswring = require('csswring')
, babel = require("gulp-babel")
, react = require("gulp-react")
, uglify = require("gulp-uglify")
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

function onChangeLog (e) {
	console.log('File ' + e.path + " was " + e.type)
}

gulp.task("css", function () {
	console.log("running task css")
	return gulp.src("./src/css/*.css")
		.pipe(postcss([
			_import(),
			cdn(),
			nested(), 
			cssnext(), 
			csswring
		]))
		.pipe(gulp.dest("./public/css"))
})

gulp.task("page", function () {
	console.log("running task page")
	return gulp.src("./src/page/**/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page"))
})

gulp.task("pagecss", function () {
	console.log("running task pagecss")
	return gulp.src("./src/page/**/*.css")
		.pipe(postcss([
			_import(),
			cdn(),
			nested(), 
			cssnext(), 
			csswring
		]))
		.pipe(gulp.dest("./public/css"))
})

gulp.task("component", function () {
	console.log("running task component")
	return gulp.src("./src/component/**/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest("./build/component"))
})

gulp.task("layout", function () {
	console.log("running task layout")
	return gulp.src("./src/layout/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(uglify())
		.pipe(gulp.dest("./build/layout"))
})

gulp.task("webpack", function () {
	console.log("running task webpack")
	webpack(webpack_config, function (err, stat) {
		if (err) {
			console.error(err);
			return;
		}
	});
})

gulp.task("clean", function () {
	console.log("running task clean")
	shelljs.rm("-r", "./build")
	shelljs.rm("-r", "./public/css")
	shelljs.rm("-r", "./public/js")
})

gulp.task('watch', function () {
	console.log("gulp is watching now")
  gulp.watch('./src/css/*.css', ['css']).on('change', onChangeLog)
  gulp.watch('./src/page/**/*.jsx', ['page', 'webpack']).on('change', onChangeLog)
  gulp.watch('./src/page/**/*.css', ['pagecss']).on('change', onChangeLog)
  gulp.watch('./src/layout/*.jsx', ['layout', 'webpack']).on('change', onChangeLog)
  gulp.watch('./src/component/**/*.jsx', ['component', 'webpack']).on('change', onChangeLog)
  gulp.watch('./src/entry/*.js', ['webpack']).on('change', onChangeLog)
})

gulp.task("default", ["clean", "css", "page", "pagecss", "component", "layout", "webpack"]);

gulp.task('hash', function () {
	var hash = crypto.createHash('md5').update(crypto.randomBytes(256)).digest('hex').substr(0, 6)
	fs.writeFileSync("./cdn/hash.json", JSON.stringify(hash))
})

gulp.task('deploy', ['hash', 'default'], function () {
	require("./cdn/upload.js")()
})

