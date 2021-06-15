var gulp = require("gulp");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

const sassTask = function () {
	return gulp
		.src("./src/assets/sass/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./src/assets/css/"));
};

gulp.task("sass", function () {
	gulp.watch("./src/assets/sass/**/*.scss", sassTask);
});
