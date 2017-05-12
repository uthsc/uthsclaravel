var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

/*
 |--------------------------------------------------------------------------
 | Copy
 |--------------------------------------------------------------------------
 */

//Copy fonts
gulp.task('copy-fonts', function() {
  gulp.src('bower_components/font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}')
    .pipe(gulp.dest('public/fonts'));
  gulp.src('bower_components/font-awesome/css/**/*.{css,css.map}')
    .pipe(gulp.dest('public/css'));
});

//Copy images
gulp.task('copy-images', function() {
  gulp.src('resources/images/*')
    .pipe(gulp.dest('public/images'));
});

//Copy vendor js
gulp.task('copy-vendor-js', function() {
  gulp.src('bower_components/jquery/dist/*')
    .pipe(gulp.dest('public/js'));

  gulp.src('bower_components/foundation-sites/dist/*.js')
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Sass
 |--------------------------------------------------------------------------
 */

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src',
  'bower_components/uthsc-emerald/scss',
  'bower_components'
];

//Output unminified css and map
gulp.task('sass', function () {
  gulp.src('resources/assets/sass/app.scss')
    .pipe($.rename('uthsc.scss'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      //outputStyle: 'compressed',
      includePaths: sassPaths
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe($.sourcemaps.write('../css'))
    .pipe(gulp.dest('public/assets/css'));
});

//Output minified sylesheet
gulp.task('sass-dist', function () {
  gulp.src('resources/assets/sass/app.scss')
    .pipe($.sass({
      outputStyle: 'compressed',
      includePaths: sassPaths
    }))
    .on('error', $.sass.logError)
    .pipe($.rename('uthsc.min.css'))
    .pipe(gulp.dest('public/assets/css'));
});

/*
 |--------------------------------------------------------------------------
 | Js
 |--------------------------------------------------------------------------
 */

gulp.task('buildjs', function() {
  gulp.src ([
    //'vendor/bower_components/foundation-sites/dist/foundation.js',
    'resources/assets/js/app.js',
    'vendor/bower_components/uthsc-emerald/js/partials/uthsc.off-canvas.js',
    'vendor/bower_components/uthsc-emerald/js/partials/uthsc.safari-bottom-nav-fix.js',
    'resources/assets/js/partials/**/*.js'
  ])
    .pipe($.concat('uthsc.js'))
    .pipe(gulp.dest('public/js'))
    .pipe($.uglify())
    .pipe($.rename('uthsc.min.js'))
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('copy', ['copy-fonts', 'copy-images', 'copy-vendor-js']);

gulp.task('build', ['sass-dist', 'copy']);

gulp.task('default', ['sass'], function () {
  gulp.watch(['resources/assets/sass/**/*.scss'], ['sass']);
});
