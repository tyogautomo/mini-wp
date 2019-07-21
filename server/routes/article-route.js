const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const multer = require('multer')
const upload = multer({
    dest: 'uploads/'
})

const ArticleController = require('../controllers/article-controller')

router.use(auth.authentication)

router.get('/', ArticleController.getAll)
router.post('/', upload.single('avatar'), ArticleController.createArticle)

router.get('/edit/:articleId', auth.authorization, ArticleController.editPage)
router.put('/edit/:articleId', auth.authorization, ArticleController.updateArticle)
router.delete('/delete/:articleId', auth.authorization, ArticleController.delete)

module.exports = router