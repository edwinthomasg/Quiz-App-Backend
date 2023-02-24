const express = require('express')
const { default: mongoose } = require('mongoose')
const schema = require('./schema/schema')
const app = express()
const port = 4040
const expressGraphQl = require('express-graphql').graphqlHTTP

app.use("/graphql", expressGraphQl({
    schema,
    graphiql: true
}) )

mongoose.set('strictQuery', false)

mongoose.connect("mongodb://localhost:27017/quiz")

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})