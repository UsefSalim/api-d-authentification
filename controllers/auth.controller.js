const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validations/auth.validation')

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
exports.login = async (req, res) => {
  //? -------------------------------------------------------------  validate Data 
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  try {
    //? ------------------------------------------------------------verify if mail exist 
    const user = await User.findOne({ email: req.body.email }).exec()
    if (!user) return res.status(400).send(`email ou password incorrete`)
    // ! -------------------------------------------------------------veriffier e mots de pass
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send(`email ou password incorrete`)
    //*------------------------------------------------------- crée et assigner un token     
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
    res.header('jwt', token).send(token)
    res.status(200).send(`l'utisisateur ${user.name} est connecter`)
  } catch (error) {
    res.status(500).send({ error })
  }
}
exports.logout = async (req, res) => {

}

