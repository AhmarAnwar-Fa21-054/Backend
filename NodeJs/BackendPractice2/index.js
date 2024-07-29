const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {
        res.render("index", { files: files })
    })
})
app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
        res.redirect("/")
    })
})
app.get("/files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, fileData) => {
        res.render("show", { filename: req.params.filename, fileData: fileData })
    })
})
app.get("/edit/:filename", (req, res) => {
    res.render("edit", { filename: req.params.filename.split(".")[0] })
})
app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.previous}.txt`, `./files/${req.body.new}.txt`, (err) => {
        res.redirect("/")
    })
})
app.get("/delete/:filename", (req, res) => {
   fs.unlink(`./files/${req.params.filename}`,(err)=>{
    res.redirect("/")
   })
})
app.get("/editContent/:filename",(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,fileData)=>{
    res.render("editContent",{fileData:fileData,filename:req.params.filename})
  })
})
app.post("/editContent",(req,res)=>{
    fs.writeFile(`./files/${req.body.title}`,req.body.details,(err)=>{
        res.redirect("/")
    })
})
app.listen(3000)