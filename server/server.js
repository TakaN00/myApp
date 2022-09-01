const express = require('express');
const app = express();

require('dotenv').config()
app.use(express.json())

const cors = require('cors')
app.use(cors('http://localhost:3000'))

require('./config/connectDB')

//routes
app.use('/api/v1/users', require('./routes/userRoute'))
app.use('/api/v1/products', require('./routes/productRoute'))
app.use('/api/v1/cart', require('./routes/cartRoute'))
app.use('/api/v1/orders', require('./routes/orderRoute'))
app.use('/api/v1/wishlist', require('./routes/wishlistRoute'))
app.use('/api/v1/categories', require('./routes/categoryRoute'))
app.use('/api/v1/messages', require('./routes/messageRoute'))

app.use('/my-uploads',express.static('my-uploads'))

app.listen(process.env.PORT, ()=>console.log('listening on port ', process.env.PORT));




