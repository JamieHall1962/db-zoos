const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  create,
  read,
  readById,
  update,
  del
};

function create(zoo) {
  return db("zoos")
    .insert(zoo)
    .into("zoos");
}

function read() {
  return db("zoos");
}

function readById(id) {
  return db("zoos")
    .where({ id })
    .first();
}

function update(id, changes) {
  return db("zoos")
    .where({ id })
    .update(changes);
}

function del(id) {
  return db("zoos")
    .where({ id })
    .del();
}
