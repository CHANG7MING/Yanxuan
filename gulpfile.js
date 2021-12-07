var gulp = require('gulp')
var sass = require("gulp-sass")(require('sass'))

gulp.task("default", function () {
    gulp.src('./css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./test'));
});