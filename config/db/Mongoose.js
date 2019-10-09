const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.MONGODB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log('MongoDb Connect...'))
        .catch(err => console.log(err));
};




