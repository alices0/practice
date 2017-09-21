// plugin  var
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect-php'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    extender = require('gulp-html-extend'),
    fileinclude = require('gulp-file-include'),
    gulpPlumber = require('gulp-plumber');

// common
var reload = browserSync.reload;
//path
var web = {
    sass: [
        'sass/*.scss',
        'sass/**/*.scss',
        'sass/**/**/*.scss'
    ],
    html: [
        'app/*.html',
        'app/**/*.html'
    ],
    images: ['images/*']
    // fonts: ['resources/assets/fonts/*', 'resources/assets/fonts/**/*'],
    // sass: [
    //     'resources/assets/sass/*.scss',
    //     'resources/assets/sass/views/vender/**/*.scss'
    // ],
    // tmp: 'resources/assets/tmp/css/*.css'
};

gulp.task('css', function () {
    var plugins = [
        autoprefixer({
            broswer: ['last 1 vrsion']
        })
    ];
    return gulp.src('./css/*.css')
        .pipe(gulpPlumber())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./css/autoprefixer'));
});


//  sass
gulp.task('styles', function () {
    gulp.src(web.sass) //要處理的scss檔案
        //  .pipe(gulpPlumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'expanded' // compact , expanded, nested
        }))
        .pipe(gulp.dest('css')) //指定編譯後的路徑

});

//broswerSync static
gulp.task('static', ['styles'], function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: "index.html"
        }
    });
    gulp.watch(web.sass, ['styles']).on('change', reload); //watch  sass
    gulp.watch('css/*.css', ['css']).on('change', reload); //watch  sass
    gulp.watch('*.html').on('change', reload); //watch html
    gulp.watch(web.images).on('change', reload); //watch images
    // gulp.watch( web.html , ['fileinclude'] ).on('change', reload); //watch template

});

//執行指令

gulp.task('default', ['static']);
