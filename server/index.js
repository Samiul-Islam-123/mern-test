const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const SignupRoute = require('./Routes/Auth/Signup');
const ConnectToDatabase = require('./Database/Connection');
const LoginRoute = require('./Routes/Auth/Login');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5500;

app.get('/', (req,res) => {
  res.json({
    message : "Server is up and running perfectly"
  })  
})

//custom routes
app.use('/auth',SignupRoute);
app.use('/auth',LoginRoute);


app.listen(PORT,async () => {
    await ConnectToDatabase(process.env.DATABASE_URL)
    console.log("Server is up and running on PORT : "+PORT);
})