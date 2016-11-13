var gulp = require('gulp');
var inject = require('gulp-inject');
var mainBowerFiles = require('gulp-main-bower-files');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('bower', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                'blueimp-load-image': {
                    main: [
                        './js/load-image.all.js'
                    ]
                },
                'font-awesome': {
                    main: [
                        './css/font-awesome.css',
                        './fonts/**/*'
                    ]
                }
            }
        }))
        .pipe(gulp.dest('./lib'));
});

gulp.task('lib', ['bower'], function() {
    gulp.src('./lib/**/*.js')
        .pipe(concat('lib_scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));

    gulp.src('./lib/**/*.css')
        .pipe(concat('lib_styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('lib-inject', ['lib'], function() {
    var sources = gulp.src(['./dist/lib_scripts.js', './dist/lib_styles.css']);
    return gulp.src('./index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./'))
});

gulp.task('js', function() {
    return gulp.src(['js/lib/**/*.js', 'js/app.js', './js/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js-inject', ['js'], function() {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src('./dist/scripts.js'), {relative: true}))
        .pipe(gulp.dest('./'));
});

/* Build, concatenate and minify all SASS files */
gulp.task('styles', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles-inject', ['styles'], function() {
    return gulp.src('./index.html')
        .pipe(inject(gulp.src('./dist/*.css'), {relative: true}))
        .pipe(gulp.dest('./'))
});

gulp.task('inject', function() {
    var sources = gulp.src(['./dist/lib_styles.css', './dist/lib_scripts.js',
        './dist/styles.css', './dist/scripts.js'], {read: false});

    return gulp.src('./index.html')
        .pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['bower', 'lib', 'js', 'styles', 'inject'], function() {
    gulp.watch('./js/**/*.js', ['js', 'inject']);
    gulp.watch(['./sass/**/*.scss', '!./sass/materialize/**/*'], ['styles', 'inject']);
    gulp.watch('./bower_components/**/*', ['lib', 'inject']);

    return gulp.src('./')
        .pipe(server({
            livereload: true,
            host: '0.0.0.0'
        }));
});

gulp.task('build', ['lib', 'js', 'styles', 'inject']);
