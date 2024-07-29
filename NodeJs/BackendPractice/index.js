const express = require("express")
const app = express()
const path = require("path")
//setting up parsers for form
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")
app.get("/", (req, res) => {
    res.render("index")
})
app.get("/author/:username", (req, res) => {
    res.send(`Welcome, ${req.params.username.toUpperCase()}, You are doing great:-)`)
})
app.get("/author/:username/:age", (request, res) => {
    res.send(`Welcome, ${request.params.username} of age ${request.params.age}, You are doing great:-)`)
})
app.listen(3000, () => {
    console.log(__dirname);
})