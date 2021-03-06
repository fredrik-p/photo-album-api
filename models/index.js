/**
 * Models index
 */

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
})

const bookshelf = require('bookshelf')(knex)

const Photo = require('./Photo')(bookshelf)
const Album = require('./Album')(bookshelf)
const User = require('./User')(bookshelf)

module.exports = {
    bookshelf,
    Album,
    Photo,
    User
}