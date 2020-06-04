const puppeteer = require('puppeteer');

const SUBREDDIT_URL = (reddit) => `https://old.reddit.com/r/${reddit}/`;

const self = {
    browser: null,
    page: null,

    initialize: async (reddit) => {

        self.browser = await puppeteer.launch({headless: true});
        self.page = await self.browser.newPage();

        //GO to the subreddit with pupeteer
        await self.page.goto(SUBREDDIT_URL(reddit), { waitUntil: 'networkidle0' })

    },

    getResults: async () => {

        let elements = await self.page.$$('#siteTable > div[class*="thing"]');
        let results = [];


        for (let element of elements){

            let title = await element.$eval(('p[class="title"]'), node => node.innerText.trim());
            let rank = await element.$eval(('span[class="rank"]'), node => node.innerText.trim());
            let postTime = await element.$eval(('p[class="tagline "] > time'), node => node.getAttribute('title'));
            let authorURL = await element.$eval(('p[class="tagline "] > a[class*="author"]'), node => node.getAttribute('href'));
            let author = await element.$eval(('p[class="tagline "] > a[class*="author"]'), node => node.innerText.trim());
            let score = await element.$eval(('div[class="score likes"]'), node => node.innerText.trim());

            post = [title, authorURL]
            //console.log(post)
            results.push(post)

            /*
            results.push({
                postTitle: title,
                //rank,
                //postTime,
                postDescription: authorURL,
                tag: "masks"
                //author,
                //score,
            }) 
            */            
            /*
            results.push({
                title,
                rank,
                postTime,
                authorURL,
                author,
                score,
            }) 
            */

        }

        return results;
    }

}    

module.exports = self;