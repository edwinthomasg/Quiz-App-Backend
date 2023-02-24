const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    questions: [
        {
            questionNumber: {
                type: Number,
                required: true
            },
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    option: {
                        type: String,
                        required: true
                    },
                    value: {
                        type: String,
                        required: true
                    }
                }
            ],
            answer: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Quiz', QuizSchema)