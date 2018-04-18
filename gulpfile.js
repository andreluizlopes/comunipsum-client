const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

gulp.task("sass", function() {
    gulp.src("./src/assets/sass/**/*.scss")
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(sass({outputStyle: "compressed"}))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./src/assets/css"));
});

gulp.task('build', ['sass']);

gulp.task("sass-watch", function() {
    gulp.watch("./src/assets/**/*.scss", ["sass"]);
});