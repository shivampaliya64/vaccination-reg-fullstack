const express = require('express')
const app = express();
const port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

var userService = require('./dataService/dataService');
app.use(userService);

var cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
});




const oracledb=require('oracledb');
const config={
    user: 'SHIVAM',
    password: '123',
    connectString: 'localhost:1521/xe'
}


app.listen(port, () => {
  console.log(`Server up and running @ port ${port}!`)
});