const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const dotenv = require('dotenv')
dotenv.config()
const app = express();

// import routes
const routAuthentication = require("./routes/AuthenticationRoute");

// app middleware
app.use(bodyParser.json());
app.use(cors());


app.use(routAuthentication);
app.use('/product', require('./routes/ProductRoute'))
app.use('/cart', require('./routes/cartRoutes'))
app.use('/payments', require('./routes/paymentRoute'))

app.use('/public', express.static(path.join(__dirname, 'public')));

const PORT =8000;

const DB_URL = process.env.DB_URI;
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:  true
})
.then(()=>{
    console.log('DB is connected');
})
.catch((err)=>console.log('DB connection err',err));




app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});