"use strict";

module.exports.basicRedisConnection = function(callback) {
  require("../config/redisConfig")(function(error, redisObject) {
    if (error) {
      callback(error.stack, null);
      redisObject.quit();
    } else {
      redisObject.on("ready", function() {
        redisObject.get("mykey", function(err, res) {
          if (err) {
            redisObject.quit();
            console.error("Cannot find value of mykey: ", err.stack);
            callback(err.stack, null);
          } else {
            redisObject.quit();
            console.log("Found value of mykey: ".res);
            callback(null, res);
          }
        });
      });
    }
  });

  // module.exports.basicRedisConnection = function(callback) {
  //   require("../config/redisConfig")(function(error, redisObject) {
  //     if (error) {
  //       callback(error.stack, null);
  //       redisObject.quit();
  //     } else {
  //       redisObject.on("ready", function() {
  //         redisObject.get("mykey", function(err, res) {
  //           if (err) {
  //             redisObject.quit();
  //             console.error("Cannot find value of mykey: ", err.stack);
  //             callback(err.stack, null);
  //           } else {
  //             redisObject.quit();
  //             console.log("Found value of mykey: ".res);
  //             callback(null, res);
  //           }
  //         });
  //       });
  //     }
  //   });
  //
  // const tag = event.hashtag.replace(/^#/, "");
  // const key = "related:" + tag;
  // let error, response;

  // redis.on("end", () => {
  //   callback(error, response);
  // });
  //
  // redis.on("ready", function() {
  //   redis.get(key, (err, res) => {
  //     if (err) {
  //       redis.quit(() => {
  //         error = err;
  //       });
  //     } else {
  //       if (res) {
  //         // Tag is found in Redis, so send results directly.
  //         redis.quit(() => {
  //           response = res;
  //         });
  //       } else {
  //         // Tag is not yet in Redis, so query Ritetag.
  //         rt.hashtagDirectory(tag, (err, res) => {
  //           if (err) {
  //             redis.quit(() => {
  //               error = err;
  //             });
  //           } else {
  //             redis.set(key, res, err => {
  //               if (err) {
  //                 redis.quit(() => {
  //                   error = err;
  //                 });
  //               } else {
  //                 redis.quit(() => {
  //                   response = res;
  //                 });
  //               }
  //             });
  //           }
  //         });
  //       }
  //     }
  //   });
  // });
};
