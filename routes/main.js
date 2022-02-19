"use strict";

const iso8601 = require('../lib/iso8601');

module.exports = (req, res, next) => {
    res.response.payload = {
        "time": iso8601(new Date())
    };
    res.json(res.response);
}
