var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var gulpIf = require('gulp-if');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// yup i followed this tuto: https://css-tricks.com/gulp-for-beginners/
// it was awesome and changed my life for good, so i'm not ashamed
// thanks for already teach me something new, chaordic.
// (i have bad memories about browser sync so didn't put it here on propouse)

// Compile scss to css
gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass()) 
		.pipe(gulp.dest('app/css'))
});

// Compile and minify CSS and JS called at html
gulp.task('useref', function(){
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

// Optimize and cache images
gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/images'))
});

// Copy fonts to dist dir
gulp.task('fonts', function() {
	return gulp.src('app/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))
})

// Clean dist dir
gulp.task('clean:dist', function() {
	return del.sync('dist');
})

// Clean cache 
gulp.task('cache:clear', function (callback) {
	return cache.clearAll(callback)
})

// Watches
gulp.task('watch', function(){
	gulp.watch('app/scss/**/*.scss', ['sass']); 
})

// **** ACTIONS ***** //

// BUILD
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

// DEFAULT
gulp.task('default', function (callback) {
  runSequence(['sass', 'watch'],
    callback
  )
})

