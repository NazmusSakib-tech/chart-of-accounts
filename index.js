const express = require('express');
// const Student = require('./models/students');
// const Course = require('./models/courses');
require('./db/conn');


const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use((err, req, res, next) => {
    console.log(err.message);
})
// create a new student 
app.get('/', (req, res) => {
    res.send('test chart of Accounts ');
});





app.listen(port, '192.168.68.129', () => {
    console.log('listen port on 8000')
})