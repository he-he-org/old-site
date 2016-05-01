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
    envify = require("gulp-envify"),
    notifier = require("node-notifier"),
    merge = require("gulp-merge"),
    eslint = require("gulp-eslint"),
    postcss = require("gulp-postcss"),
    gulpIf = require('gulp-if'),

    packageJson = require("./package.json") || {};

// Read settings from package.json
var settings = packageJson.gulp //todo: validate and provide reasonable defaults

function logError(err) {
    gutil.log(gutil.colors.red(err.message))
}

var babelConfig = {
    global: true,
    presets: [require('babel-preset-es2015')],
};


/*
 *
 * PRODUCTION TASKS
 *
 */
gulp.task("scripts_vendor", function () {
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
        .on("error", logError)
        .pipe(source("vendor.js"))
        .on("error", logError)
        .pipe(streamify(envify({NODE_ENV: "production"})))
        .on("error", logError)
        .pipe(streamify(uglify()))
        .on("error", logError)
        .pipe(gulp.dest(settings.dest.scripts))
        .on("error", logError)
})


gulp.task("scripts", function () {
    function makeBundle(entryPoint) {
        var bundler = browserify(settings.src.scripts + "/" + entryPoint.from, {
            debug: false,
            cache: {},
            packageCache: {},
            fullPaths: true,
            extensions: [".js", ".jsx"]
        })

        // Register all dependencies as external (they are loaded via vendor bundle)
        Object.keys(packageJson.dependencies).forEach(function (dep) {
            bundler.external(dep)
        })

        bundler = bundler.transform(babelify, babelConfig)

        return bundler.bundle()
            .on("error", logError)
            .pipe(source(entryPoint.to))
            .on("error", logError)
            .pipe(streamify(envify({NODE_ENV: "production"})))
            .on("error", logError)
            .pipe(streamify(uglify()))
            .on("error", logError)
            .pipe(gulp.dest(settings.dest.scripts))
            .on("error", logError)
    }

    return merge(settings.entryPoints.map(makeBundle))
})

gulp.task("styles", function () {
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

gulp.task('lint', function () {
    return gulp.src(settings.src.scripts + '/**').pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});

gulp.task('lint-n-fix', function () {
    function isFixed(file) {
        return file.eslint != null && file.eslint.fixed
    }

    return gulp.src(settings.src.js + '/**.js').pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(settings.src.js)))
});


gulp.task("default", ["lint", "scripts_vendor", "scripts", "styles"])


/*
 *
 * DEBUG TASKS
 *
 */
gulp.task("debug_scripts_vendor", function () {

    var bundler = browserify("", {
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true,
        extensions: [".js", ".jsx"],
        require: Object.keys(packageJson.dependencies)
    })

    bundler = bundler.transform(babelify, babelConfig)
    bundler = watchify(bundler)

    function onError(err) {
        gutil.log(gutil.colors.red(err.message))

        notifier.notify({
            "title": "ERROR",
            "message": err.message
        })
    }

    function rebundle() {
        return bundler.bundle()
            .on("error", onError)
            .pipe(source("vendor.js"))
            .on("error", onError)
            .pipe(gulp.dest(settings.dest.scripts))
            .on("error", onError)
    }

    bundler.on("update", function () {
        var start = Date.now()
        gutil.log("Rebundling vendor...")
        var bundle = rebundle()
        bundle.on("end", function () {
            gutil.log("Rebundling vendor... Done! Time: " + (Date.now() - start))
        })
    })

    return rebundle()
})


gulp.task("debug_scripts", function () {
    function makeBundle(entryPoint) {
        var bundler = browserify(settings.src.scripts + "/" + entryPoint.from, {
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true,
            extensions: [".js", ".jsx"]
        })

        // Register all dependencies as external (they are loaded via vendor bundle)
        Object.keys(packageJson.dependencies).forEach(function (dep) {
            bundler.external(dep)
        })

        bundler = bundler.transform(babelify, babelConfig)
        bundler = watchify(bundler, {poll: true})

        function onError(err) {
            gutil.log(gutil.colors.red(err.message))
            notifier.notify({
                "title": "ERROR",
                "message": err.message
            })
        }

        function rebundle() {
            return bundler.bundle()
                .on("error", onError)
                .pipe(source(entryPoint.to))
                .on("error", onError)
                .pipe(gulp.dest(settings.dest.scripts))
                .on("error", onError)
        }

        bundler.on("update", function () {
            var start = Date.now()
            gutil.log("Rebundling '" + entryPoint.from + "'...")
            var bundle = rebundle()
            bundle.on("end", function () {
                gutil.log("Rebundling '" + entryPoint.from + "'... Done! Time: " + (Date.now() - start))
            })
        })

        return rebundle()
    }

    return merge(settings.entryPoints.map(makeBundle))
})

gulp.task("debug_styles", function () {
    var files = settings.src.styles + "/**.css"
    var plugins = [
        require("postcss-nested"),
        require("postcss-simple-vars")
    ];

    function build() {
        return gulp.src(files)
            .pipe(postcss(plugins))
            .pipe(gulp.dest(settings.dest.styles))
    }

    build()
    var watcher = gulp.watch(files, build);
    watcher.on('change', function(event) {
        gutil.log('File ' + event.path + ' was ' + event.type + ', rebuilding styles...');
        var start = Date.now()
        build().on('end', function(){
            gutil.log("Rebuilding styles... Done! Time: " + + (Date.now() - start))
        })
    });
    return watcher
})

gulp.task("debug", ["debug_styles", "debug_scripts_vendor", "debug_scripts"]);
