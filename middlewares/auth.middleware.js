const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  //* recuperer le token de la personne connecter 
  const token = req.header('jwt')
  if (!token) return res.status(401).send('personne non connecter')
  try {
    const verify = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = verify
    next()
  } catch (error) {
    res.status(400).send('Token invalide')
  }
}