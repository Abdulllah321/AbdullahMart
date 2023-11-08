const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://multimart:multimart@cluster0.8kteiid.mongodb.net/"
).then(()=>{
    console.log("mongodb connected ");
})
.catch (()=> {
    console.log("failed");
})

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require: true
    },
    profilePic:{
        type:String,
        require: true
    },
    
})

const collection = mongoose.model("User", userSchema);

module.exports = collection