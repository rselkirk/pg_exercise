
const settings = require("./settings"); 
const moment = require('moment');

const knex = require ('knex')({
  client: 'pg',
  connection: settings,
});

const args = process.argv[2];

function singleLookup (args) {
  knex('famous_people').where('first_name', args).orWhere('last_name', args).asCallback(function(err, rows) {
    console.log (`Found ${rows.length} person(s) by the name '${args}'`);
    let dob = moment(rows[0].birthdate).format('YYYY-MM-DD'); 
    console.log(`- ${rows[0].id} : ${rows[0].first_name} ${rows[0].last_name}, born '${dob}'`);
    knex.destroy();
  });
}

singleLookup(args);

