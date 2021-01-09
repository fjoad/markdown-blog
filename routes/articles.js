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
router.get('/:slug', async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug })
        res.render('articles/show', {article, article})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
})

//edit articles form 
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

//create new article 
router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

//PUT (edit) article 
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

//delete article 
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        } catch (err) {
            res.render(`articles/${path}`, {article: article})
        }
    }
}

module.exports = router 