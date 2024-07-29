const express = require("express")
const app = express()
app.use(express.json())//to handle data coming from the framework
app.use(express.urlencoded({extended:true}))//when we are basically using EJS and we are actually making sure ky
                                            //wo FORM hi submit ho.....!(so that we can check-out FORM data)
app.use((req, res, next) => {
    console.log("Phela MiddleWare chla");
    next()
})
app.use((req, res, next) => {
    console.log("Doosra MiddleWare chla");
    next()
})
app.get("/", (req, res, next) => {
    return next(new Error("A Problem Occured!"))
    res.send("Hello from my own server:-)")
})
app.get("/profile", (req, res, next) => {
    return next(new Error("A Problem Occured!"))
})
app.get("/about", (req, res, next) => {
    return next(new Error("A Problem Occured!"))
    res.send("this is About page:-)")
})
app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500).send('Something broke!')
})

app.listen(3000)