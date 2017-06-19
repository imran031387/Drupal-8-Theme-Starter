var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');




gulp.task('imagemin', function () {
    return gulp.src('./images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images'));
});


gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css'));
});


gulp.task('uglify', function() {
    return gulp.src('./lib/*.js')
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function(){
    livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./lib/*.js', ['uglify']);
    gulp.watch(['./css/style.css', './**/*.twig', './js/*.js'], function (files){
        livereload.changed(files)
    });
});
