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

var babelConfig = {
    global: true,
    presets: [require('babel-preset-es2015')],
};


function onError(e) {
    gutil.log(e.message)
    notifier.notify({
        "title": "ERROR",
        "message": e.message
    })
}

const scriptsEntryPoints = settings.scripts.entryPoints.map(x => ({from: `entry-${x}.js`, to: `${x}.js`}));
const cssEntryPoints = settings.styles.entryPoints.map(x => ({from: settings.styles.src + `/entry-${x}.css`, to: settings.styles.dest +`/${x}.css`}));

/*
 *
 * PRODUCTION TASKS
 *
 */
gulp.task("scripts:vendor", function () {
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
        .on("error", onError)
        .pipe(source("vendor.js"))
        .on("error", onError)
        .pipe(streamify(envify({NODE_ENV: "production"})))
        .on("error", onError)
        .pipe(streamify(uglify()))
        .on("error", onError)
        .pipe(gulp.dest(settings.scripts.dest))
        .on("error", onError)
})


gulp.task("scripts", function () {
    function makeBundle(entryPoint) {
        var bundler = browserify(settings.scripts.src + "/" + entryPoint.from, {
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
            .on("error", onError)
            .pipe(source(entryPoint.to))
            .on("error", onError)
            .pipe(streamify(envify({NODE_ENV: "production"})))
            .on("error", onError)
            .pipe(streamify(uglify()))
            .on("error", onError)
            .pipe(gulp.dest(settings.scripts.dest))
            .on("error", onError)
    }

    return merge(scriptsEntryPoints.map(makeBundle))
})

gulp.task("styles", function () {
    var plugins = [
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-simple-vars"),
        require("autoprefixer")({browsers: ["last 2 versions"]}),
        require("cssnano")({browsers: ["last 2 versions"]}),
    ];

    function bundle(entryPoint) {
        return gulp.src(entryPoint.from)
            .pipe(postcss(plugins))
            .on('error', onError)
            .pipe(rename(entryPoint.to))
            .on('error', onError)
            .pipe(gulp.dest("."))
    }

    return merge(cssEntryPoints.map(bundle))
})

gulp.task('lint', function () {
    return gulp.src(settings.scripts.src + '/**').pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
});

gulp.task('lint-n-fix', function () {
    function isFixed(file) {
        return file.eslint != null && file.eslint.fixed
    }

    return gulp.src(settings.scripts.src + '/**.js').pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest(settings.scripts.src)))
});


gulp.task("default", ["lint", "scripts:vendor", "scripts", "styles"])


/*
 *
 * DEBUG TASKS
 *
 */
gulp.task("debug:scripts:vendor", function () {

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

    function rebundle() {
        return bundler.bundle()
            .on("error", onError)
            .pipe(source("vendor.js"))
            .on("error", onError)
            .pipe(gulp.dest(settings.scripts.dest))
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


gulp.task("debug:scripts", function () {
    function makeBundle(entryPoint) {
        var bundler = browserify(settings.scripts.src + "/" + entryPoint.from, {
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

        function rebundle() {
            return bundler.bundle()
                .on("error", onError)
                .pipe(source(entryPoint.to))
                .on("error", onError)
                .pipe(gulp.dest(settings.scripts.dest))
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

    return merge(scriptsEntryPoints.map(makeBundle))
})

gulp.task("debug:styles", function () {
    var plugins = [
        require("postcss-import"),
        require("postcss-nested"),
        require("postcss-simple-vars"),
        require("autoprefixer")({browsers: ["last 1 Chrome versions"]}),
    ];

    function bundle(entryPoint) {
        function build() {
            return gulp.src(entryPoint.from)
                .pipe(postcss(plugins))
                .on('error', onError)
                .pipe(rename(entryPoint.to))
                .on('error', onError)
                .pipe(gulp.dest("."))
        }
        build()
        var watcher = gulp.watch(settings.styles.src + "/**.css");
        watcher.on('change', function(event) {
            gutil.log('File ' + event.path + ' was ' + event.type + ', rebuilding "'+entryPoint.from+'"...');
            var start = Date.now()
            build().on('end', function() {
                gutil.log("Rebuilding styles... Done! Time: " + + (Date.now() - start))
            })
        });
        return watcher
    }

    return cssEntryPoints.forEach(bundle)
})

gulp.task("browser-sync", function(){
    require('browser-sync').create().init({
        proxy: "localhost:80",
        files: ["web/css/*.css", "web/js/*.js"]
    })
})

gulp.task("debug", ["debug:styles", "debug:scripts:vendor", "debug:scripts", "browser-sync"]);
