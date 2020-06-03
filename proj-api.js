const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reddit_scraper = require('./reddit_scraper');


async function wrapper (){

    const app = express();
    const port = 5000;

    //keep post data
    let projects = []

    test = {
        postTitle: "TESTINGG",
        postDescription: "TSSSSSSSSSSSSSSST",
        tag: "masks"
    }

    try {
        await reddit_scraper.initialize('facemasks');
        results = await reddit_scraper.getResults();
    } catch(err){
        console.log('somting wong :(')
    }

    for (proj in results){
        projects.push(test);
    }


    app.use(cors());

    //I assume it's turning data into JSON format
    //it grabs http body, decodes, and passes as JSON to req.body
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());


    app.post('/', (req, res) => {
        const proj = req.body;
        console.log(proj);
        console.log(test)
        projects.push(proj);

        //res.send('Project is added to the database');

    });

    //DELETE THIS PART IF HEROKU DOESN"T WORK
    app.delete('/', (req, res) => {
        projects = projects.filter((value) => {
            if(req.body.postTitle == value.postTitle
                && req.body.postDescription == value.postDescription
                && req.body.tag == value.tag)
                return false;
            else return true;
        });
    });

    app.get("/", (req, res) => {
        res.json(projects);
    });


    app.listen(process.env.PORT || port);

    console.log(`Hello world app listening on port ${port}!`);

}