const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth.js');


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


 
mongoose.connect(process.env.MDB_URL)
.then(()=> console.log("Connented to the database"))
.catch((error) => console.log(error))

app.use('/auth/v1' , require("./router/userRouter.js"));
app.use('/v1/task', auth, require("./router/taskRouter.js"));

app.listen(port , () =>{
    console.log(`Server listen at port ${port}`)
})
