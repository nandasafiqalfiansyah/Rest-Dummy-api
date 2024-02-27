const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const date = require("express");
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Dummy API's Faster",
      version: "0.1.0",
      Author: "Nanda safiq alfiansyah",
      Framework: "Express js",
      Date: date,
      Github: "https://github.com/nandasafiqalfiansyah",
      description:
        "This is a simple get API application made with Express and documented in system Dummy API's Faster",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(specs));
};
