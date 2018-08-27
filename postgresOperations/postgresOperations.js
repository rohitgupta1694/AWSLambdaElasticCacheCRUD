// Basic Postgres Operations
const insertJSONDataToTable = function(client, callback) {
  const jsonData =
    '[{"movie_id": 56,"title": "Cimarron Kid, The","genre": "Western","average_rating": 4.3,"release_year": "06-Sep-2013"},' +
    '{"movie_id": 34,"title": "Black Moon","genre": "Fantasy|Mystery|Sci-Fi|War","average_rating": 4.4,"release_year": "03-Jul-2003"},' +
    '{"movie_id": 39,"title": "When Ladies Meet","genre": "Comedy|Drama|Romance","average_rating": 3.7,"release_year": "26-Aug-1996"},' +
    '{"movie_id": 23,"title": "One True Thing","genre": "Drama","average_rating": 1.9,"release_year": "15-Jul-1999"},' +
    '{"movie_id": 75,"title": "Satanic Rites of Dracula, The","genre": "Horror","average_rating": 3.4,"release_year": "10-Mar-2011"},' +
    '{"movie_id": 96,"title": "Torpedo Run","genre": "Drama|War","average_rating": 4.4,"release_year": "21-Jan-1999"},' +
    '{"movie_id": 22,"title": "The Spectacular Now","genre": "Comedy|Drama|Romance","average_rating": 2.7,"release_year": "03-May-2015"},' +
    '{"movie_id": 50,"title": "Tennessee Johnson","genre": "Drama","average_rating": 4.2,"release_year": "11-May-1997"},' +
    '{"movie_id": 25,"title": "X-Men","genre": "Action|Adventure|Sci-Fi","average_rating": 1.9,"release_year": "08-Jan-1990"},' +
    '{"movie_id": 58,"title": "Batman and The Dark Knight Rises","genre": "Action|Thriller","average_rating": 4.8,"release_year": "26-Jul-2016"}]';
  const query =
    "insert into movies select * from json_populate_recordset(null::movies, '" +
    jsonData +
    "')";

  client
    .query(query)
    .then(res => {
      console.log("Successfully inserted all the data in Movies table.", res);
      callback(null, res);
    })
    .catch(e => {
      console.log("Error Occured inside insert function:", e.stack);
      callback(e, null);
    });
};

const createAndAddJSONData = function(client, callback) {
  client
    .query(
      "CREATE TABLE MOVIES(movie_id INT, title VARCHAR, genre VARCHAR, average_rating DECIMAL(2,1), release_year DATE);"
    )
    .then(res => {
      console.log("Movies table created");
      callback(null, res);
    })
    .catch(e => {
      console.log("Error Occured inside create table function:", e.stack);
      callback(e, null);
    });
};
// Basic Postgres Operations

// Get All Movies Logic Block
const getAllMoviesQuery = function(client, callback) {
  client
    .query("SELECT * FROM MOVIES")
    .then(res => {
      console.log("Got all the data: ", res);
      callback(null, res);
    })
    .catch(error => {
      console.error("There is some error in fetching all data: ", error.stack);
      callback(error, null);
    });
};

module.exports.getAllMovies = function(event, callback) {
  require("../config/postgresConfig")(true, function(error, client) {
    if (error) {
      callback(error, null);
    } else {
      getAllMoviesQuery(client, function(error, response) {
        if (error && error.stack.includes("does not exist")) {
          createAndAddJSONData(client, function(error, response) {
            if (error && error.stack.includes("already exists")) {
              insertJSONDataToTable(client, function(errorMessage, response) {
                if (errorMessage) {
                  callback(errorMessage, null);
                  client.end();
                } else {
                  getAllMoviesQuery(client, function(error, response) {
                    if (error) {
                      callback(errorMessage, null);
                      client.end();
                    } else {
                      callback(null, response.rows);
                      client.end();
                    }
                  });
                }
              });
            } else if (error) {
              callback(error.stack, null);
              client.end();
            } else {
              insertJSONDataToTable(client, function(errorMessage, response) {
                if (errorMessage) {
                  callback(errorMessage, null);
                  client.end();
                } else {
                  getAllMoviesQuery(client, function(error, response) {
                    if (error) {
                      callback(errorMessage, null);
                      client.end();
                    } else {
                      callback(null, response.rows);
                      client.end();
                    }
                  });
                }
              });
            }
          });
        } else if (error) {
          callback(error.stack, null);
          client.end();
        } else {
          console.log("Row count: ", response.rowCount);
          if (response.rowCount === 0) {
            insertJSONDataToTable(client, function(errorMessage, response) {
              if (errorMessage) {
                callback(errorMessage, null);
                client.end();
              } else {
                getAllMoviesQuery(client, function(error, response) {
                  if (error) {
                    callback(errorMessage, null);
                    client.end();
                  } else {
                    callback(null, response.rows);
                    client.end();
                  }
                });
              }
            });
          } else {
            callback(null, response.rows);
            client.end();
          }
        }
      });
    }
  });
};
// Get All Movies Logic Block
