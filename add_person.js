const settings = require("./settings"); 
const knex = require ('knex')({
  client: 'pg',
  connection: settings,
});


const newCelebrity = process.argv.slice(2);

function addCelebrity (newCelebrity) {
knex.insert({first_name: newCelebrity[0], last_name: newCelebrity[1], birthdate: newCelebrity[2]}).into("famous_people").asCallback(function(err, rows) {
console.log(err, rows);

  knex.select().from('famous_people').asCallback(function(err, rows) {
  console.log(err, rows);
  knex.destroy();
  });
});
}

addCelebrity(newCelebrity);