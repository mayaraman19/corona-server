const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reddit_scraper = require('./reddit_scraper')

async function wrapper() {
   
    const app = express();
    const port = 5000;

    test = {
        postTitle: "HELLLOO THERE",
        postDescription: "IS THEREW ANYBODY OUT THERE",
        tag: "masks"
    }


    //keep post data
    let projects = [];

    //whew do the scraping thing here

    let results = []
    try{
        await reddit_scraper.initialize('facemasks');
        var posts = await reddit_scraper.getResults("masks", "facemasks");
        results.push.apply(results, posts)
    } catch (err){
        console.log("uh oh promise failed reddit scraper brokin :(")
    }

    try{
        await reddit_scraper.initialize('Sourdough');
        var posts = await reddit_scraper.getResults("baking", "Sourdough");
        results.push.apply(results, posts)
    } catch (err){
        console.log("uh oh promise failed reddit scraper brokin :(")
    }
    
    try{
        await reddit_scraper.initialize('Breadit');
        var posts = await reddit_scraper.getResults("baking", "Breadit");
        results.push.apply(results, posts)
    } catch (err){
        console.log("uh oh promise failed reddit scraper brokin :(")
    }

    try{
        await reddit_scraper.initialize('gardening');
        var posts = await reddit_scraper.getResults("gardening", "gardening");
        results.push.apply(results, posts)
    } catch (err){
        console.log("uh oh promise failed reddit scraper brokin :(")
    }

    //go through scraped posts and make them into
    //miniprojs and add to the projects
    for (let index = 2; index < results.length; index++) {
        let title = results[index][0];
        let postURL = results[index][1];
        let postTag = results[index][2];
        let author = results[index][3];
        let subreddit = results[index][4];
        let description = "Post by " + author + ", scraped from r/" + subreddit + "\n"
        console.log("post: ", title, description)
        post = {
            postTitle: title,
            postDescription: description,
            tag: postTag,
            link: postURL,
        }        
        projects.push(post)
    }
 
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

    //random comment

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


    app.listen(/*process.env.PORT || */port);

    console.log(`Hello world app listening on port ${port}!`);

}

wrapper();
