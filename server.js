const dotenv = require('dotenv');
dotenv.config({ path: "./config/.env" })
const express = require('express');
require('./config/dbConnect')

const app = express()
const PORT = process.env.PORT || 5000



app.listen(PORT, () => console.log(`Application connectée au port : ${PORT}`))