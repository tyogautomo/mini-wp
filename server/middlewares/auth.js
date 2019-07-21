const jwtoken = require('../helpers/jwt')
const Article = require('../models/article')

module.exports = {
    authentication(req, res, next) {
        // console.log(req.headers.token, 'AUTHENTICATION <<<<<<<<<<<<<')
        try {
            var decoded = jwtoken.verifyToken(req.headers.token)
            req.headers.decode = decoded
            next()
        } catch (err) {
            throw new Error(`Invalid token.`)
            // next(err)
        }
    },
    authorization(req, res, next) {
        // console.log(req.params, 'AUTHORIZATION <<<<<<<<<<<<<<<<<<<<')
        Article.findById(req.params.articleId)
            .then(article => {
                if (article.author == req.headers.decode.id) {
                    next()
                } else {
                    throw new Error(`Unauthorized process.`)
                }
            })
    }
}