const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();

const app = express()
const port = 8080
 
app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/events',require('./routes/events'))
app.use('/api/events',require('./routes/tickets'))
app.use('/api/search',require('./routes/search'))
app.use('/api/contact',require('./routes/contactus'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})