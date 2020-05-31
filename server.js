const express = require("express");
const app = express();
const port = 5000;

let projects = [];

app.get("/projects", (req, res) => {
    res.json(projects);
})
app.listen(port, () => {
 console.log(`Listening on port ${port}!`)
});