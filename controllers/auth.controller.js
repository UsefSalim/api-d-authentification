const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const { registerValidation } = require('../validations/auth.validation')

exports.register = async (req, res) => {
  //? -------------------------------------------------------------  validate Data 
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //? ------------------------------------------------------------verify if mail exist 
  try {
    const ifExist = await User.findOne({ email: req.body.email }).exec()
    if (ifExist) return res.status(400).send(`l'adress mail : ${req.body.email}  , existe deja`)
    // ! -------------------------------------------------------------Hash the password
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
    //* -------------------------------------------------------------  create a new user
    const user = new User({
      ...req.body
    })
    //!--------------------------------------------------------  register the user in the database
    await user.save()
    res.status(201).send({ user: user._id, message: "Utulisateur crée avec succée" })
    // res.send({ user })
  } catch (error) {
    res.status(500).send({ error })
  }
}

exports.login = (req, res) => {
  res.send('login route')
}

