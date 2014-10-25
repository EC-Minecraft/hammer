var gulp = require("gulp");

gulp.task('component-build', function() {
  var component = require("gulp-component-builder");
  var uglify = require('gulp-uglify');
  var react = require('component-plugin-react');

  gulp
    .src("component.json")
    .pipe(component.scripts({
      name: "hammer"
    }, function(builder) {
      builder.use("react", react());
      builder.use("scripts", component.plugins.js());
    }))
    // .pipe(uglify())
    .pipe(gulp.dest("public/javascripts"))
});

gulp.task('watch-component', function() {
  gulp.watch(['component.json', 'components/**/*.js', 'components/**/*.jsx'], ['component-build']);
});

gulp.task('watch', ['watch-component'], function() {

});

gulp.task('default', function() {});