const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validations/auth.validation')

exports.register = async (req, res, next) => {
  // const { email, password, name } = req.body
  //? -------------------------------------------------------------  validate Data 
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //? ------------------------------------------------------------verify if mail exist 
  try {
    const ifExist = await User.findOne({ email: req.body.email }).exec()
    if (ifExist) return res.status(400).send(`l'adress mail : ${req.body.email}  , existe deja`)
    //* -------------------------------------------------------------  create a new user
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    //!--------------------------------------------------------  register the user in the database
    try {
      await user.save()
      res.status(201).send({ user: user._id, message: "Utulisateur crée avec succée" })
    } catch (error) {
      res.status(400).send({ error })
    }
  } catch (error) {
    res.status(500).send({ error })
  }
}

exports.login = (req, res) => {
  res.send('login route')
}

