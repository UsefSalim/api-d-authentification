const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
  () => console.log("MongoDb Connected")
)
