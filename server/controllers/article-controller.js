const Article = require('../models/article')

class ArticleController {

    static createArticle(req, res, next) {
        // console.log('masuk jonnnnn!!!')
        console.log(req.file, 'dari controller create <<<<<<<<<<<<<<<<<<<<<<<<')
        Article.create({
                title: req.body.title,
                content: req.body.content, //currently hardcore
                author: req.headers.decode.id,
                featured_image: req.body.featured_image //currently empty
            })
            .then(article => {
                res.status(201).json(article)
            })
            .catch(next)

    }

    static getAll(req, res, next) {
        Article.find({
                author: req.headers.decode.id
            })
            .then(articles => {
                res.status(200).json(articles)
            })
            .catch(next)
    }

    static delete(req, res, next) {
        // console.log('masuk <<<<<<<<<<<<<<<<<<<<<<<<<<')
        Article.deleteOne({
                _id: req.params.articleId
            })
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(next)
    }

    static editPage(req, res, next) {
        Article.findById(req.params.articleId)
            .then(article => {
                res.status(200).json(article)
            })
            .catch(next)
    }

    static updateArticle(req, res, next) {

        Article.updateOne({
                _id: req.params.articleId
            }, {
                $set: {
                    title: req.body.title,
                    content: req.body.content
                }
            })
            .then(updated => {
                res.status(200).json(updated)
            })
            .catch(next)

    }

}

module.exports = ArticleController