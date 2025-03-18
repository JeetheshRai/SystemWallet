const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json());
const config = require('./config');
const { database } = require('./database');
const dbInit = async () => {
    await database.createConnection()
};
dbInit()
const walletController = require('./controllers/walletController');
app.use('/', walletController);
const port = config.server_port
app.listen(port,()=>{
    console.log('chat server started at '+ new Date() + ' on '+ port)
})