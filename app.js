const express = require("express");
const collection = require("./mongoose");
const cors = require("cors");

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(cors())

app.get("/" ,cors(), (req, res) => {

} )

app.post("/" , async (req, res) => {
    const {email, password, file} = req.body

    try {
        const check = await collection.findOne({email: email})
        if(check) {
            res.json("exist")
        } else {
            res.json("not exist")
        }
    } catch (error) {
        res.json("not exist")
    }
})

app.post("/signup" , async (req, res) => {
    const {email, password, file} = req.body;

    const data =  {
        email: email,
        password: password,
        file: file
    }

    try {
        const check = await collection.findOne({email: email})
        if(check) {
            res.json("This email is already exist")
        } else {
            res.json("not exist")
            await collection.insertMany([data])
        }
    } catch (error) {
        res.json("not exist")
    }
})

app.listen(8000, () => {
    console.log("port is running on  ${port}");
})