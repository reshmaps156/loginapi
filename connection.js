const mongoose = require('mongoose')

const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then((result)=>console.log('MongoDB Connected')).catch((error)=>console.log(`MongoDB connection failed due to ${error}`))