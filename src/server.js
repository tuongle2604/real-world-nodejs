global.ROOT_DIR = process.cwd();
global.SOURCE_DIR = process.cwd() + "/src";
global.CONFIG_DIR = process.cwd() + "/configs";

const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');

const { preProcess, process: coreProcess, postProcess } = require ("./middlewares/core");
const validateInput = require("./middlewares/input-validate");
const logger = require("./logger");

module.exports = () => ({
  addRoute(route, module) {
    const { url, controller, method, name } = route;

    this.app[method](url,
      preProcess,
      validateInput(module, url, name),
      coreProcess(controller),
      postProcess
    );
  },

  bindingRoutes() {
    const routeDir = SOURCE_DIR + "/api";
    const modules = fs.readdirSync(routeDir);

    for (const module of modules) {
      const moduleDir = SOURCE_DIR + "/api/" + module + "/route";
      const routes = require(moduleDir);

      for (const route of routes) {
        this.addRoute(route, module);
      }
    }
  },

  listen(port) {
    const mode = process.env.NODE_ENV === "production" ? "PRODUCTION" : "DEVELOPER";
    logger.info(`application is running in ${mode} mode`);
    logger.info("****************************************");

    const app = express();
    this.app = app;

    app.use(bodyParser.json({ limit : '4mb' }));
    this.bindingRoutes();
    app.listen(port);
  }
})
