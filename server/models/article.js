const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    createdAt: Date 
})


const Article = mongoose.model('Article', articleSchema)

module.exports = Article;