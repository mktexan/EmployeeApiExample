const constants = require('../constants/constants')
const connectToMongoDb = (mongoose) => {
    mongoose.connect(process.env.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false })

    const db = mongoose.connection

    db.once('open', () => console.log(constants.databaseConnectionSuccess))

    db.on('error', () => { throw new Error(constants.databaseConnectionFailed) })
}

module.exports = { connectToMongoDb }
