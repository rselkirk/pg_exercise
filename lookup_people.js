const pg = require("pg");
const settings = require("./settings"); // settings.json
const moment = require('moment');
const db = require('./db');


var args = process.argv.slice(2);

function singleSearch(done /* our callback */) {
  db.connect((error, client) => {
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", args, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log (`Found ${result.rows.length} person(s) by the name '${args}'`);
    let x = moment(result.rows[0].birthdate).format('YYYY-MM-DD'); 
    console.log(`- ${result.rows[0].id} : ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${x}'`);
    client.end(); 
    });
  });
}

singleSearch(args);