const express = require('express');
const app = express()
require('./config/passport')

// routes
const authRoutes = require('./routes/authRoutes')
authRoutes(app)

// env variables
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`Your server is running on ${PORT}`));