const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String
    },
    markdown : {
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: () => Date.now()   //default parameter takes a function argument 

    }
})

module.exports = mongoose.model('Article', articleSchema)