const mongoose = require('mongoose');
mongoose.connect(process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },

)
  .then(() => console.log("BD connecter"))
  .catch(err => console.log(err))
