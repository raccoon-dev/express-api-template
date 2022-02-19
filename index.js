"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const log = require('./lib/log');
//
const routes = require('./routes');
const models = require('./models');

/**
 * Begin Models
 */
const mUsers = models.users;
/**
 * End Models
 */

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    log.info('Request from (' + req.socket.remoteAddress + '):' + req.socket.remotePort + ' ' + req.method + ': ' + req.url);
    res.header("Content-Type", 'application/json');
    res.response = {
        result: true,
        error: "OK"
    };

    if (req.header('api-key') === undefined) {
        req.user = false;
        show401(req, res);
        return;
    } else {
        mUsers.selectByKey(req.header('api-key'))
            .then((user) => {
                if (user === undefined) {
                    req.user = false;
                    show401(req, res);
                    return;
                } else {
                    //console.log(user);
                    req.user = user;
                }
                return next();
            })
    }
});






/**
 * Begin Handlers
 */

app.get('/', routes.main);

/**
 * End Handlers
 */


// Handler for unhandled commands
app.all('*', (req, res) => {
    log.error('404 Command not found from (' + req.socket.remoteAddress + '):' + req.socket.remotePort + ' => ' + req.method + ': ' + req.originalUrl);
    res.response.result = false;
    res.response.error = '404 - Command not found: ' + req.method + ': ' + req.originalUrl;
    res.status(404).json(res.response);
});

var server = app.listen(process.env.PORT, function () {
    log.info("Server running on port " + process.env.PORT);
});

app.use((err, req, res, next) => {
    if (!err) return next();
    console.log(err);
    if (err === 'unauthorized') {
        show401(req, res);
    } else {
        log.error('500 ' + err.toString() + ' from (' + req.socket.remoteAddress + '):' + req.socket.remotePort + ' => ' + req.method + ': ' + req.originalUrl);
        res.response.result = false;
        res.response.error = '500 - ' + err.toString();
        res.status(500).json(res.response);
    }
});

function show401(req, res) {
    log.error('401 Unauthorized from (' + req.socket.remoteAddress + '):' + req.socket.remotePort + ' => ' + req.method + ': ' + req.originalUrl);
    res.response.result = false;
    res.response.error = '401 - Unauthorized';
    res.status(401).json(res.response);
}
