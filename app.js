"use strict";
const express = require("express");
const sls = require("serverless-http");
const postgresOperations = require("./postgresOperations/postgresOperations");

const app = express();

app.get("/test_connection", async (req, res, next) => {
  console.log("Testing lambda function locally");
  postgresOperations.addJSONData(req, function(error, results) {
    if (error) {
      res.status(500).json({
        message: "Some error occurred" + error
      });
    } else {
      res.status(200).json({
        message: "Success Response" + results
      });
    }
  });

  //    else {
  //     res.status(200).json({
  //     message: 'Welcome to the project-name api' + error
  // });
  //   }
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));

module.exports.testPostgresConnection = sls(app);
