"use strict"

const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

module.exports = (textLength) => {
    let str = '';
    for (let i = 0; i < textLength; i++) {
        str += dict.charAt(Math.floor(Math.random() * dict.length));
    };
    return str;
}