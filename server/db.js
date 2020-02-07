const mongoose = require('mongoose');
const Promise = require('bluebird');

let hotelSchema = {
    id: Number, 
    views: Number, 
    averageDailyRateMin: Number,
    averageDailyRateMax: Number, 
    adultsPerRoom: Number,
    maxRooms: Number, 
    price: Number,
    daysToCancel: Number
}

let Hotel = mongoose.model('Hotel', hotelSchema);

const getLocations = (location) => {
    return new Promise((resolve, reject) => {
        Hotel.find(location, (err, locations) => {
            if (err) {
                reject(err);
            } else {
                resolve(locations);
            }
        })
    })
}

const getRandomNumberInRange = (min, max) => {
    return Math.floor((Math.random() * (max - min)) + min)
}

const getRandomNumber = (range) => {
    return Math.floor(Math.random() * range);
}

const seed = () => {
    for (let i = 0; i < 100; i++) {
        Hotel.create({
            id: i,
            views: getRandomNumber(10),
            averageDailyRateMin: getRandomNumberInRange(25, 50),
            averageDailyRateMax: getRandomNumberInRange(51, 100),
            adultsPerRoom: getRandomNumberInRange(2, 5),
            maxRooms: getRandomNumberInRange(3, 6),
            price: getRandomNumberInRange(100, 200),
            daysToCancel: 10
        })
    }
}

module.exports.seed = seed;
module.exports.Hotel = Hotel;
module.exports.getLocations = getLocations;