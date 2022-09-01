const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('database connection established'))
.catch((err)=>console.log(err))