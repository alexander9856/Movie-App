const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sashko:sashko123@moviescluster.yvdqisk.mongodb.net/?retryWrites=true&w=majority');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB