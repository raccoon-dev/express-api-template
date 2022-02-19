"use strict"

require('dotenv').config();
const crypto = require('crypto');
const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: process.env.SQLITE_FILENAME
    }
});


async function selectByKey(key) {
    return await new Promise((resolve, reject) => {
        let sha256 = crypto.createHmac("sha256", process.env.PASSWORD_SECRET);
        let k = sha256.update(key).digest("hex");
        let q = knex("users").where("key", k).first();
        resolve(q);
    });
};


module.exports = {
    selectByKey
};
