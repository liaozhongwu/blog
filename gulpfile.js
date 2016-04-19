var gulp = require("gulp")
, postcss = require("gulp-postcss")
, autoprefixer = require('autoprefixer')
, csswring = require('csswring')
, babel = require("gulp-babel")
, react = require("gulp-react")
, webpack = require("webpack")
, webpack_config = require("./webpack.config")

gulp.task("css", function () {
	return gulp.src("./src/css/*.css")
		.pipe(postcss([autoprefixer({browsers: ['last 2 version']}), csswring]))
		.pipe(gulp.dest("./public/css"))
})

gulp.task("page", function () {
	return gulp.src("./src/page/**/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(gulp.dest("./build/page"))
})

gulp.task("pagecss", function () {
	return gulp.src("./src/page/**/*.css")
		.pipe(postcss([autoprefixer({browsers: ['last 2 version']}), csswring]))
		.pipe(gulp.dest("./public/css"))
})

gulp.task("component", function () {
	return gulp.src("./src/component/**/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(gulp.dest("./build/component"))
})

gulp.task("layout", function () {
	return gulp.src("./src/layout/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(gulp.dest("./build/layout"))
})

gulp.task("webpack", function () {
	webpack(webpack_config, function (err, stat) {
		if (err) {
			console.error(err);
			return;
		}
	});
})


gulp.task('watch', function () {
  gulp.watch('./src/css/*.css', ['css'])
  gulp.watch('./src/page/**/*.jsx', ['page', 'webpack'])
  gulp.watch('./src/page/**/*.css', ['pagecss'])
  gulp.watch('./src/layout/*.jsx', ['layout', 'webpack'])
  gulp.watch('./src/component/**/*.jsx', ['component', 'webpack'])
  gulp.watch('./src/entry/*.js', ['webpack'])
});

gulp.task("default", ["css", "page", "pagecss", "component", "layout", "webpack"]);