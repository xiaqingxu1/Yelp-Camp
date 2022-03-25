const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '621fcfcbbf73f30b3cb689d0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'kdlakldk;fla',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [{
                url: 'https://res.cloudinary.com/du3m4ua5q/image/upload/v1646947457/Yelpcamp/ifs9k7lkzmqqbcknddat.jpg',
                filename: 'Yelpcamp/ifs9k7lkzmqqbcknddat'
            },
            {
                url: 'https://res.cloudinary.com/du3m4ua5q/image/upload/v1646947457/Yelpcamp/xzn0jr98rjziqqm6susp.jpg',
                filename: 'Yelpcamp/xzn0jr98rjziqqm6susp'
            }]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})