var gulp = require("gulp");
var babel = require("gulp-babel");
var react = require("gulp-react");
var webpack = require("webpack");
var webpack_config = require("./webpack.config");

gulp.task("page", function () {
	return gulp.src("./src/page/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(gulp.dest("./build/page"))
});

gulp.task("component", function () {
	return gulp.src("./src/component/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(gulp.dest("./build/component"))
});

gulp.task("layout", function () {
	return gulp.src("./src/layout/*.jsx")
		.pipe(babel())
		.pipe(react())
		.pipe(gulp.dest("./build/layout"))
});

gulp.task("webpack", function () {
	webpack(webpack_config, function (err, stat) {});
})

gulp.task("default", ["page", "component", "layout", "webpack"]);