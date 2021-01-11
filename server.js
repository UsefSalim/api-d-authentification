require('dotenv').config({ path: "./config/.env" })
require('./config/dbConnect')
const express = require('express');
const bodyParser = require('body-parser')
const UserRoutes = require('./routes/user.routes')
const PostsRoutes = require('./routes/posts.routes')


const app = express()
const PORT = process.env.PORT || 5000

// * Middlewares 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)


app.use('/api/user', UserRoutes)
app.use('/api/posts', PostsRoutes)


app.listen(PORT, () => console.log(`Application connectée au port : ${PORT}`))