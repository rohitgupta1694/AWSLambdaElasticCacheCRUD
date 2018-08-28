"use strict";
const express = require("express");
const sls = require("serverless-http");
const postgresOperations = require("./postgresOperations/postgresOperations");
const basicRedisCrudOperations = require("./redisCRUD/basicRedisCrud");

const app = express();

app.get("/get_movies", async (req, res, next) => {
  console.log("Getting all movies from postgres");
  postgresOperations.getAllMovies(req, function(error, results) {
    if (error) {
      res.status(500).json({
        message: "Some error occurred: " + error
      });
    } else {
      console.log("Response: ", results);
      res.status(200).json({
        movies: results
      });
    }
  });
});

app.get("/test_redis_connection", async (req, res, next) => {
  console.log("Testing Redis Connection");
  basicRedisCrudOperations.basicRedisConnection(function(error, results) {
    if (error) {
      res.status(500).json({
        message: "Some error occurred: " + error
      });
    } else {
      console.log("Redis Connection successfully created: ", results);
      res.status(200).json({
        result: "Redis Connection successfully created: " + results
      });
    }
  });
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));

module.exports.testPostgresConnection = sls(app);
