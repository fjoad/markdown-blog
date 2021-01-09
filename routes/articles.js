const express = require('express')
const Article = require('../models/article')
const router = express.Router()

//articles index 
router.get('/', (req, res) => {
    res.send('in articles')
})

//new articles form 
router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()})
})

//view specific article 
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.render('articles/show', {article, article})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
})

//create new article 
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title, 
        description: req.body.description,
        markdown: req.body.markdown,
        createdAt: new Date()
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (err) {
        console.error(err)
        res.render('articles/new', {article: article})
    }
})

module.exports = router 