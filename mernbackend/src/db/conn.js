const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://krati:Beauty16&@cluster0.6cv8ui4.mongodb.net/Youregister?retryWrites=true&w=majority"
    ).then(()=>{
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
})