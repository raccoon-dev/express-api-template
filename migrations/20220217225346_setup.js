"use strict"

const crypto = require('crypto');
require('dotenv').config();
const rnd = require('../lib/rand_text');

const SALT_LENGTH = 32;
const APIKEY_LENGTH = 64;
const DEFAULT_ADMIN_LOGIN = 'admin';
const DEFAULT_ADMIN_PASSWORD = 'admin';


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex, Promise) {
    const uuid = crypto.randomUUID();
    const salt = rnd(SALT_LENGTH);
    const key = rnd(APIKEY_LENGTH);
    let sha256 = crypto.createHmac("sha256", process.env.PASSWORD_SECRET);
    const pass = sha256.update(DEFAULT_ADMIN_PASSWORD + salt).digest("hex");
    sha256 = crypto.createHmac("sha256", process.env.PASSWORD_SECRET);
    const skey = sha256.update(key).digest("hex");
    console.log('Created "' + DEFAULT_ADMIN_LOGIN + '" account with password="' + DEFAULT_ADMIN_PASSWORD + '" and API key="' + key + '"');

    return knex.schema
        .createTable("users", (table) => {
            table.string('id').primary();
            table.string('login');
            table.string('salt');
            table.string('password');
            table.string('key');
            table.timestamps();
        })
        .then(() =>
            knex("users").insert([
                {
                    id: uuid,
                    login: DEFAULT_ADMIN_LOGIN,
                    salt: salt,
                    password: pass,
                    key: skey
                },
            ])
        )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
