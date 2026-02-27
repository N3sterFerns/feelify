const app = require("./src/app.js")
const {dbConnect} = require("./src/config/dbConnect.js")



dbConnect().then(()=>{
    app.listen(3000, ()=>{
        console.log("server listening on 3000")
    })

})