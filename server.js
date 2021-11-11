const express = require('express')
const app = express()

// env variables
const PORT = process.env.PORT || 5000

app.get('/', (req, res)=>{
    res.send({hi: 'there'})
});

app.listen(PORT, ()=> console.log(`Your server is running on ${PORT}`));