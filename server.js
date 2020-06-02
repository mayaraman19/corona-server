const express = require("express");
const app = express();
const port = 5000;

let projects = [];


testPost = {
    postTitle: "testinggggggggggggg",
    postDescription: "plsplspls pretty pls work",
    tag: "masks"
}
projects.push(testPost)

app.get("/projects", (req, res) => {
    res.json(projects);
})
app.listen(port, () => {
 console.log(`Listening on port ${port}!`)
});