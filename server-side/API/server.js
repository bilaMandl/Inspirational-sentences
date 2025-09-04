const express = require('express');
const connectDB = require('../DAL/connectToDB')
const cors = require('cors');
const port = 3000;
const app = express();

connectDB();

const bagroudsRoute = require('./routes/backgroudRoute');
const quoteGroupsRoute = require('./routes/quoteGroupRoute');
const quoteRoute = require('./routes/quoteRoute');
const artRoute = require('./routes/artRoute');
const userRoute = require('./routes/userRoute');
const { config } = require('dotenv');
app.use(cors());
app.use(express.json());

app.use('/backgrouds', bagroudsRoute);
app.use('/quoteGroups', quoteGroupsRoute);
app.use('/quotes', quoteRoute);
app.use('/arts', artRoute);
app.use('/users', userRoute);

app.get('/', (req, res) => { res.send('✨wellcome✨') });


app.use((err, req, res, next) => {
    console.err(err.messege);
    res.status(500).send(err.name + ":" + err.messege);
})

app.listen(port, () => console.log(`I am runing at http://localhost:${port}`))