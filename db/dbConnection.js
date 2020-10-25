const mongoose = require('mongoose');

// Connecting database
module.exports.connectDB = async () => {
    try {
        await mongoose.connect(
            'mongodb://localhost:27017/notes-app',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            },
            () => console.log('database connected successfully'))
    } catch (err) {
        console.log(err)
    }
}