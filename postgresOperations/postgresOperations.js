module.exports.addJSONData = function(event, callback) {
    let client = require('../config/postgresConfig')(true)
    let errorResponse, successResponse
    client.query('create table student(id int, name varchar(30));')
    .then(res => {
      console.log("Student table created.\n");
      console.log("Value from client : ", res.row[0]);
      successResponse = res.row[0]
      callback(errorResponse, successResponse);
    })
    .catch(e => {
      console.error("Some error occured while creating student table.\n", e.stack);
      callback(e.stack, successResponse);
    })
}
