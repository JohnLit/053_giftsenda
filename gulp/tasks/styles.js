const gulp = require('gulp')
const postcss = require('gulp-postcss')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const sourcemaps = require('gulp-sourcemaps')
const shorthand = require('gulp-shorthand')
const autoprefixer = require('gulp-autoprefixer')
const gulpStylelint = require('gulp-stylelint')
const rename = require("gulp-rename")
const lost = require('lost')

module.exports = function styles() {
    return gulp.src('src/styles/*.scss')
        .pipe(plumber())
        .pipe(gulpStylelint({
            failAfterError: true,
            reporters: [
                {
                    formatter: 'string',
                    console: false
                }
            ]
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            lost(),
        ]))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(cleanCSS({
            debug: true,
            compatibility: '*'
        }, details => {
            console.log(`${details.name}: Original size:${details.stats.originalSize} - Minified size: ${details.stats.minifiedSize}`)
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/css'))
}

