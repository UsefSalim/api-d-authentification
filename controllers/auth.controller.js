const User = require('../models/user.model');
const { registerValidation } = require('../validations/auth.validation')

exports.register = async (req, res) => {
  const { email, password, name } = req.body
  //? -------------------------------------------------------------  validate Data 
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //? ------------------------------------------------------------verify if mail exist 
  // try {
  const emailExist = await User.findOne({ email: email })
  if (emailExist) return res.status(400).send(`l'adress mail : ${req.body.email}  , existe deja`)
  // } catch (error) {
  //   res.status(400).send({ error })
  // }
  //* -------------------------------------------------------------  create a new user
  const user = new User({
    ...req.body
  })
  //!--------------------------------------------------------  register the user in the database
  try {
    await user.save()
    res.status(201).send({ user: user._id, message: "Utulisateur crée avec succée" })
  } catch (error) {
    res.status(400).send({ error })
  }
}

exports.login = (req, res) => {
  res.send('login route')
}

