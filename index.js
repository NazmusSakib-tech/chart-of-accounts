const express = require('express');
const chartOfAccount = require('./models/chartOfAccount');
const Group = require('./models/group');
const Account = require('./models/account');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const checkLogin = require('./middlewares/checkLogin')
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

// insert single Class 
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
// insert single Account 
try {
    app.post('/accounts', async (req, res) => {
        const account = new Account(req.body);
        console.log(req.body);
        const createAccount = await account.save();
        res.status(201).send(createAccount);
    })
} catch (err) {
    res.status(400).send(err);
}



// insert Multiple class 
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
    app.get('/chart', checkLogin, async (req, res) => {
        const chartData = await chartOfAccount.find();
        res.send(chartData);
    })
} catch (err) {
    res.send(err);
}

// single Class find

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


// single Group find

try {
    app.get('/groups/:id', async (req, res) => {
        const _id = req.params.id;
        console.log(_id);
        const singleGroupData = await Group.findOne({ _id: _id }).populate('accounts');
        res.send(singleGroupData);
    })
} catch (err) {
    res.send(err);
}
// single Account find

try {
    app.get('/accounts/:id', async (req, res) => {
        const _id = req.params.id;
        console.log(_id);
        const singleAccountData = await Account.findOne({ _id: _id }).populate({ path: 'group', });
        res.send(singleAccountData);
    })
} catch (err) {
    res.send(err);
}

// single Class Update
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

// single Class Update for group property 
try {
    app.put('/chart/:id', async (req, res) => {
        const _id = req.params.id;

        console.log(_id);
        // const singleChartDataUpdate = await chartOfAccount.findByIdAndUpdate(_id, { $push: { groups: req.body.groups._id } });
        // res.send(singleChartDataUpdate);
        res.send("Hello");
    })
} catch (err) {
    res.status(400).send(err);
}


// single Group Update
try {
    app.patch('/groups/:id', async (req, res) => {
        const _id = req.params.id;
        console.log(_id);
        const singleGroupDataUpdate = await Group.findByIdAndUpdate(_id, req.body);
        res.send(singleGroupDataUpdate);
    })
} catch (err) {
    res.status(400).send(err);
}

//user signUp

try {
    app.post('/signup', async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword
        });
        console.log(req.body);
        const createNewUser = await newUser.save();
        res.status(201).send(createNewUser);
    })
} catch (err) {
    res.status(400).send(err);
}


//user Login

app.post("/login", async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if (isValidPassword) {
                // generate token
                const token = jwt.sign({
                    username: user[0].username,
                    userId: user[0]._id,
                }, "process.env.JWT_SECRET", {
                    expiresIn: '10h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "wrong pass. Authetication failed!"
                });
            }
        } else {
            res.status(401).json({
                "error": "User Not found! Authetication failed!"
            });
        }
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});

//end login



app.listen(port, () => {
    console.log('listen port on 8000')
})