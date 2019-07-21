if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://localhost/mini-wp', {
    useNewUrlParser: true
});


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const articleRoute = require('./routes/article-route')
const userRoute = require('./routes/user-route')

app.use('/users', userRoute)
app.use('/articles', articleRoute)

app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(err.status || 500).json(err.message)
})

app.listen(port, () => console.log(`Example app listening on port ${port}`))