const express = require('express');
const chartOfAccount = require('./models/chartOfAccount');
const Group = require('./models/group');
// const Course = require('./models/courses');
require('./db/conn');


const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use((err, req, res, next) => {
    console.log(err.message);
})
// create a new COA 
app.get('/', (req, res) => {
    res.send('test chart of Accounts ');
});

// insert single chart 
try {
    app.post('/chart', async (req, res) => {
        const chart = new chartOfAccount(req.body);
        console.log(req.body);
        const createChart = await chart.save();
        res.status(201).send(createChart);
    })
} catch (err) {
    res.status(400).send(err);
}
// insert single group 
try {
    app.post('/groups', async (req, res) => {
        const group = new Group(req.body);
        console.log(req.body);
        const createGroup = await group.save();
        res.status(201).send(createGroup);
    })
} catch (err) {
    res.status(400).send(err);
}
// insert Multiple chart 
try {
    app.post('/chartMultiple', async (req, res) => {
        // const chart = new chartOfAccount(req.body);
        console.log(req.body);
        const createChartMultiple = await chartOfAccount.insertMany(req.body);
        console.log(createChartMultiple);
        res.status(201).send(createChartMultiple);
    })
} catch (err) {
    res.status(400).send(err);
}

// Find all chart 

try {
    app.get('/chart', async (req, res) => {
        const chartData = await chartOfAccount.find();
        res.send(chartData);
    })
} catch (err) {
    res.send(err);
}

// single Chart find

try {
    app.get('/chart/:id', async (req, res) => {
        const _id = req.params.id;
        console.log(_id);
        const singleChartData = await chartOfAccount.findOne({ _id: _id }).populate('groups');
        res.send(singleChartData);
    })
} catch (err) {
    res.send(err);
}

// single Chart Update
try {
    app.patch('/chart/:id', async (req, res) => {
        const _id = req.params.id;
        console.log(_id);
        const singleChartDataUpdate = await chartOfAccount.findByIdAndUpdate(_id, req.body);
        res.send(singleChartDataUpdate);
    })
} catch (err) {
    res.status(400).send(err);
}



app.listen(port, () => {
    console.log('listen port on 8000')
})