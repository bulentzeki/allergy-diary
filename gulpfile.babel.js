/* Gulp Modules */
import gulp from "gulp";
import gUtil from "gulp-util";
/* Webpack Modules & Config */
import webpackConfig from "./webpack.config";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
/* Common Utility Plugins */
import yargs from "yargs";
import sequence from "run-sequence";

var argv = yargs.argv;
var cmdOptions = {
  inDevMode: !(argv["dist"] === true),
  appModule: (argv["app"] === true || argv["all"] === true), // --patient
  // dashboardModule: (argv["dashboard"] === true || argv["all"] === true), // --dashboard
  lint: !(argv["skip-lint"] === true),
  uglify: !(argv["skip-uglify"] === true),
  watch: !(argv["skip-watch"] === true),
  throwError: (argv["throw-error"] === true)
};

function Build(entryObject) {
  var _config = {
    host: "localhost",
    port: 3333
  };

  function _webpack() {
    var packageOpts = {
      appModule: cmdOptions.appModule,
      // dashboard: cmdOptions.dashboardModule,
      appMode: cmdOptions.inDevMode ? "dev" : "dist"
    }
    var config = webpackConfig(packageOpts, entryObject);

    gUtil.log("[webpack] started on " + packageOpts.appMode + " mode...");

    if (packageOpts.appMode === "dev") {
      var onlyDevConfig = config;
      new WebpackDevServer(webpack(onlyDevConfig), {
        publicPath: onlyDevConfig.output.publicPath,
        hot: true,
        historyApiFallback: true,
        stats: "minimal"
      })
        .listen(_config.port, _config.host, error => {
          if (error)
            throw new gUtil.PluginError("webpack-dev-server", error);
          gUtil.log("[webpack-dev-server] listening on http://" + _config.host + ":" + _config.port);
        });
    } else {
      webpack(config, (error, stats) => {
        if (error)
          throw new gUtil.PluginError("[webpack]", error);
        gUtil.log("[webpack]", stats.toString());
      });
    }
  }

  function _build() {
    gulp.task("webpack", _webpack);
    gulp.task("default", () => {
      sequence(["webpack"]);
    });
  }

  return {
    build: _build
  };
}

Build({
  bundle: "./ui/portal/app/index.js" //this line can be removed
}).build();
