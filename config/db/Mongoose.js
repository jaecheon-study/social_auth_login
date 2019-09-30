const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL,
        {
            dbName: 'social_login',
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('MongoDb Connect...'))
        .catch(err => console.log(err));
};




