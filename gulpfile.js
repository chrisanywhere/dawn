// SETUP
  // Install Nodejs, then install:
  // npm install -g gulp-cli
  // run npm install to install all dependencies

// TASKS
  // Clean: 'gulp clean'
  // Build: 'gulp'
  
  // Recommended workflow
  // 1: npm install
  // 2: npm update
  // 3: gulp clean
  // 4: gulp (default target compiles theme into dist directory)
  // 5: gulp watch (watches files and recompiles to dist directory)
  // 6: ctrl + c to exit watch task

  // Watch
  // Using Shopify Theme Kit for watch task - http://themekit.cat/
  // after compiling theme (as above), open new terminal and cd to dist dir
  // run theme watch
  // to upload to specific environment:  theme upload --env=production assets/file.liquid

'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const flatten = require('gulp-flatten');
const rename = require('gulp-rename');
const del = require('del');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');

// VERSIONS
const ver = {
  formval: '/0.8.0',
  // liquid is used by the Shipping Calculator
  liquid: '1.2.1'
};

const dirs = {
  src: '.',
  srcAssets: 'src/assets',
  srcConfig: 'src/config',
  srcCss: 'src/css',
  srcComponents: 'src/components',
  srcLayout: 'src/layout',
  srcSnippets: 'src/snippets',
  srcTemplates: 'src/templates',
  srcLib: 'src/lib',
  srcNodeModules: 'node_modules',
  dist: 'dist',
  distAssets: 'dist/assets', // js and css goes in here
  distConfig: 'dist/config',
  distLayout: 'dist/layout',
  distSnippets: 'dist/snippets',
  distTemplates: 'dist/templates',
  tmp: './tmp'
};

const searchPatterns = {
  srcComponents: dirs.srcComponents + '/**/*.js',
  srcSmthemeScss: dirs.srcCss + '/smtheme.scss',
  srcAllScss: dirs.srcCss + '/**/*.scss',
  srcStaticAssets: dirs.srcAssets + '/**/*',
  srcConfig: dirs.srcConfig + '/**/*',
  srcLayout: dirs.srcLayout + '/**/*',
  srcSnippets: dirs.srcSnippets + '/**/*',
  srcTemplates: dirs.srcTemplates + '/**/*',
  src: './**/*',
  notDist: '!' + dirs.dist
};

const scripts = {
  themeCSS: dirs.srcCss,
  bootstrapCSS: dirs.srcNodeModules + '/bootstrap/dist/css/bootstrap.min.css',
  formvalCSS: dirs.srcLib + '/formvalidation/' + ver.formval + '/dist/css',
  //formvalJS: dirs.srcLib + '/formvalidation/' + ver.formval + '/dist/js/formValidation.js',
  //formvalbsJS: dirs.srcLib + '/formvalidation/' + ver.formval + '/dist/js/framework/bootstrap.js',
  fancyboxSRC: dirs.srcNodeModules + '/@fancyapps/fancybox/dist',
  //fancyboxCSS: dirs.srcNodeModules + '/@fancyapps/fancybox/dist/jquery.fancybox.css',
  //fancyboxJS: dirs.srcNodeModules + '/@fancyapps/fancybox/dist/jquery.fancybox.js',
  //spinJS: dirs.srcNodeModules + '/spin.js/spin.js'
};

const jsDependencies = {
  bootstrapJS: dirs.srcNodeModules + '/bootstrap/dist/js/bootstrap.min.js'
};

// TASK: clean
gulp.task('clean', async function() {
  del(dirs.dist);
});

// TASK: clean
gulp.task('clean:tmp', async function() {
  del(dirs.tmp);
});

// TASK: build:css
gulp.task('build:css', function() {
  return gulp.src(searchPatterns.srcAllScss)
    .pipe(concat('smtheme.css.liquid'))
    .pipe(sass(
      {
      includePaths: [
        scripts.bootstrapCSS,
        scripts.fancyboxSRC,
        scripts.formvalCSS
      ],
      outputStyle: 'compressed'}
      )
    .on('error', sass.logError))
    .pipe(rename('smtheme.min.css.liquid'))
    .pipe(gulp.dest(dirs.distAssets));
});

// TASK: build:js-theme
gulp.task('build:js-theme', function() {
  return gulp.src(searchPatterns.srcComponents)
  .pipe(plumber())
  .pipe(concat('smtheme.build.js'))
  .pipe(babel({
    presets: [['@babel/preset-env', {modules: false}]] 
  }))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(dirs.tmp));
});

// TASK: build:js-deps
gulp.task('build:js-deps', function() {
  return gulp.src(jsDependencies.bootstrapJS)
  .pipe(plumber())
  .pipe(concat('smtheme.deps.js'))
  .pipe(gulp.dest(dirs.tmp));
});

// TASK: build:js-concat
gulp.task('build:js-concat', function() {
  const files = ["./tmp/smtheme.build.min.js", "./tmp/smtheme.deps.js"]
  
  return gulp.src(files)
  .pipe(plumber())
  .pipe(concat('smtheme.js'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest(dirs.distAssets));
});

// TASK: build:js
gulp.task('build:js', gulp.series('build:js-theme', 'build:js-deps', 'build:js-concat', 'clean:tmp'));

// TASK: build:static-assets
gulp.task('build:static-assets', function() {
  var stream =
    gulp.src(searchPatterns.srcStaticAssets)
      .pipe(flatten())
      .pipe(changed(dirs.distAssets))
      .pipe(gulp.dest(dirs.distAssets));

  return stream;
});

// TASK: build:config
gulp.task('build:config', function() {
  var stream =
    gulp.src(searchPatterns.srcConfig)
      .pipe(flatten())
      .pipe(changed(dirs.distConfig))
      .pipe(gulp.dest(dirs.distConfig));

  return stream;
});

// TASK: build:layout
gulp.task('build:layout', function() {
  var stream =
    gulp.src(searchPatterns.srcLayout)
      .pipe(flatten())
      .pipe(changed(dirs.distLayout))
      .pipe(gulp.dest(dirs.distLayout));

  return stream;
});

// TASK: build:snippets
gulp.task('build:snippets', function() {
  var stream =
    gulp.src(searchPatterns.srcSnippets)
      .pipe(flatten())
      .pipe(changed(dirs.distSnippets))
      .pipe(gulp.dest(dirs.distSnippets));

  return stream;
});

// TASK: build:templates
gulp.task('build:templates', function() {
  var stream =
    gulp.src(searchPatterns.srcTemplates)
      .pipe(flatten())
      .pipe(changed(dirs.distTemplates))
      .pipe(gulp.dest(dirs.distTemplates));

  return stream;
});

// TASK: build
gulp.task('build', gulp.parallel('build:js', 'build:css', 'build:static-assets', 'build:config', 'build:layout', 'build:snippets', 'build:templates'));

// TASK: watch
gulp.task('watch', () => {
  gulp.watch([searchPatterns.src, searchPatterns.notDist], gulp.series('build'));
});

// TASK: default
gulp.task('default', gulp.series('build'));
