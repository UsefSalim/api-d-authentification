const router = require('express').Router()
const { showPost } = require('../controllers/posts.controller')
const authMiddlewar = require('../middlewares/auth.middleware')

router.get('/', authMiddlewar, showPost)




module.exports = router;