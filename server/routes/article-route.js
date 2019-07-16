const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/article-controller')

router.get('/', ArticleController.getAll)
router.post('/', ArticleController.createArticle)
router.get('/edit/:articleId', ArticleController.editPage)
router.put('/edit/:articleId', ArticleController.updateArticle)
router.delete('/delete/:articleId', ArticleController.delete)

module.exports = router