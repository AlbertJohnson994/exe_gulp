const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

// Utility function
function isEven(num) {
    return num % 2 === 0;
}

// Task: Compile SASS
function compilaSass() {
    console.log('Compilando SASS...');
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// Task: Compress Images
function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

// Task: Compress and Obfuscate JavaScript
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

// Example Task: Use isEven function
function checkEvenNumber() {
    const num = 4; // Example number
    console.log(`The number ${num} is ${isEven(num) ? 'even' : 'odd'}.`);
    return Promise.resolve(); // Required for Gulp tasks to complete
}

// Watchers
exports.default = function() {
    gulp.watch('./source/styles/*scss', { ignoreInitial: false }, gulp.parallel(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.parallel(comprimeJavaScript));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.parallel(comprimeImagens));
    gulp.watch('./source/scripts/*.js', gulp.series(checkEvenNumber)); // Example usage
};
