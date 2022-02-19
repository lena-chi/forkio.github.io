import gulp from 'gulp';
import concat from 'gulp-concat';
import clean from 'gulp-clean';
import browserSync from 'browser-sync';
import rename from 'gulp-rename';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer'
import imagemin from 'gulp-imagemin'
import uglify from 'gulp-uglify'
import cleanCss from 'gulp-clean-css'
debugger

const sass = gulpSass(dartSass);
browserSync.create()

const path = {
    src: {
        scss: `./src/scss/**/*.scss`,
        js: `./src/js/*.js`,
        img:"./src/images/*"
    },
    dist: {
        self: `./dist/`,
        css: `./dist/`,
        js: `./dist/`,
        img: `./dist/images/`
    }
}
const cleanDist = ()=> gulp.src(path.dist.self, {allowEmpty: true}).pipe(clean())
const buildScss = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))

        // .pipe(concat('style.css'))
        .pipe(cleanCss({compatibility: `ie8`}))
        .pipe(rename('styles.min.css'))

        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream())
)
const devScss = () => (
    gulp.src(path.src.scss)
        .pipe(sass().on('error', sass.logError))

        .pipe(rename('styles.min.css'))

        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream())
)


const buildJs = () => (
    gulp.src(path.src.js)

        .pipe(concat('script.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.stream())
)

const buildImages = () =>(
    gulp.src(path.src.img)
        .pipe(imagemin())
        .pipe(gulp.dest(path.dist.img))
        .pipe(browserSync.stream())
)

const watcher = () =>{
    browserSync.init({
        server:{
            baseDir: "./"
        }
    })

gulp.watch('./index.html').on("change", browserSync.reload);
gulp.watch(path.src.scss, buildScss).on("change", browserSync.reload);
gulp.watch(path.src.js, buildJs).on("change", browserSync.reload);
gulp.watch(path.src.img, buildImages).on("change", browserSync.reload);
}


gulp.task('build', gulp.series(cleanDist, gulp.parallel(buildScss,buildJs,buildImages)))
gulp.task('dev', gulp.series(gulp.parallel(devScss,buildJs,buildImages),watcher))