const mongoose = require('mongoose');

let scoreboardSchema = new mongoose.Schema({
    homeScore: {type: String, default: '0'},
    guestScore: {type: String, default: '0'},
    time: {type: String, default: '12 : 00'},
    quarter: {type: String, default: '1'},
    shotClock: {type: String, default: '24'}
})

module.exports = mongoose.model('Scoreboard', scoreboardSchema);