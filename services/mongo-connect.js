const connectToMongoDb = (mongoose) => {
    mongoose.connect(process.env.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false })

    let db = mongoose.connection

    db.once('open', () => console.log('connected to the database'))

    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}

module.exports = { connectToMongoDb }
