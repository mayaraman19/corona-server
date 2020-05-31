const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

//keep post data
let projects = []

app.use(cors());

//I assume it's turning data into JSON format
//it grabs http body, decodes, and passes as JSON to req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post('/', (req, res) => {
    const proj = req.body;
    console.log(proj);
    projects.push(proj);

    //res.send('Project is added to the database');

});

app.get("/", (req, res) => {
    res.json(projects);
 });


app.listen(port || process.env.PORT);

console.log(`Hello world app listening on port ${port}!`);