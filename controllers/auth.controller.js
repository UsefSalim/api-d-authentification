const User = require('../models/user.model');

exports.register = async (req, res) => {
  //* create a new user 
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name
  })
  try {
    await user.save()
    res.status(201).send({ user: user._id, message: "Utulisateur crée avec succée" })
  } catch (error) {
    res.status(420).send({ error })
  }
}

exports.login = (req, res) => {
  res.send('login route')
}