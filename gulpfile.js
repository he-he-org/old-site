"use strict"
var gulp = require("gulp"),
    gutil = require("gulp-util"),

    streamify = require("gulp-streamify"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    watchify = require("watchify"),
    fs = require("fs"),
    babelify = require("babelify"),
    babelPresetEs2015 = require('babel-preset-es2015'),
    envify = require("gulp-envify"),
    notifier = require("node-notifier"),
    merge = require("gulp-merge"),
    eslint = require("gulp-eslint"),
    postcss = require("gulp-postcss"),
    gulpIf = require('gulp-if'),

    packageJson = require("./package.json") || {};

// Read settings from package.json
var settings = packageJson.gulp //todo: validate and provide reasonable defaults

function onError(err) {
    gutil.log(gutil.colors.red(err.message))
}


var babelConfig = {
    global: true,
    presets: [babelPresetEs2015],
};

gulp.task("scripts_vendor", function(){
    var bundler = browserify("", {
        debug: false,
        cache: {},
        packageCache: {},
        fullPaths: true,
        extensions: [".js", ".jsx"],
        require: Object.keys(packageJson.dependencies)
    })

    bundler = bundler.transform(babelify, babelConfig)

    return bundler.bundle()
        .on("error",  onError)
        .pipe(source("vendor.js"))
        .on("error", onError)
        .pipe(streamify(envify({NODE_ENV: "production"})))
        .on("error", onError)
        .pipe(streamify(uglify()))
        .on("error", onError)
        .pipe(gulp.dest(settings.dest.scripts))
        .on("error", onError)
})


gulp.task("scripts", function(){
    function makeBundle(entryPoint) {
        var bundler = browserify(settings.src.scripts + "/" + entryPoint, {
            debug: false,
            cache: {},
            packageCache: {},
            fullPaths: true,
            extensions: [".js", ".jsx"]
        })

        // Register all dependencies as external (they are loaded via vendor bundle)
        Object.keys(packageJson.dependencies).forEach(function(dep){
            bundler.external(dep)
        })

        bundler = bundler.transform(babelify, babelConfig)

        return bundler.bundle()
            .on("error",  onError)
            .pipe(source(entryPoint))
            .on("error", onError)
            .pipe(streamify(envify({NODE_ENV: "production"})))
            .on("error", onError)
            .pipe(streamify(uglify()))
            .on("error", onError)
            .pipe(gulp.dest(settings.dest.scripts))
            .on("error", onError)
    }

    return merge(settings.entryPoints.map(makeBundle))
})

gulp.task("styles", function(){
    var files = settings.src.styles + "/**.css"

    var plugins = [
        require("postcss-nested"),
        require("postcss-simple-vars"),
        require("autoprefixer")({browsers: ["last 2 versions"]}),
    ];
    return gulp.src(files)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(settings.dest.styles))
})

gulp.task('lint', function() {
    return gulp.src(settings.src.scripts + '/**').pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});

gulp.task('lint-n-fix', function() {
    function isFixed(file) {
        return file.eslint != null && file.eslint.fixed
    }
    return gulp.src('scripts/**.js').pipe(eslint({fix:true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest('scripts')))
});


gulp.task("default", ["lint", "scripts_vendor", "scripts", "styles"])
