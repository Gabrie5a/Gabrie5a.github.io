import express from "express";
import axios from "axios";

//get API Key
const YT_API_KEY = process.env.YT_API_KEY;
//establish API URL endpoints
const port = process.env.PORT;
const LYRIC_URL = "https://api.lyrics.ovh/v1/";
let YT_URL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&regionCode=US&type=video&key="+YT_API_KEY+"&q=";
const TRENDING_URL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=music%20video&regionCode=US&key="+YT_API_KEY;

const app = express();
//middleware - express gives a .body to both req and res
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//variables to be passed and rendered in the EJS files and partials
let greeting = "";
let videos = [];
let trendingTitles = [];
let trendingThumbnails = [];
let trendingIds = []
let artist = "";
let song = "";
let htmlCode = "";
let lyrics = "";

//LANDING PAGE
app.get("/", (req, res) =>{
    res.render("stars.ejs");
})

// GET for when '/home' endpoint is requested
app.get("/home", async (req, res) => {
    let page = "/home";
    videos = [];
    // if trending videos have not been retrieved yet retrieve the necessary vals
    if (trendingThumbnails.length ===0){
        try{
            const result = await axios.get(TRENDING_URL);
            // get thumbnails, titles and ids from videos
            let videoResults = result.data.items;
            videoResults.forEach(video =>{
                console.log(video);
                trendingThumbnails.push(video.snippet.thumbnails.default.url);
                trendingTitles.push(video.snippet.title);
                trendingIds.push(video.id.videoId)
            });
            res.render("index.ejs", {greeting: "Trending Music Videos", content: "" , videos, trendingTitles, trendingThumbnails, trendingIds, page});
        } catch (error) {
            console.error(error);
            res.render("index.ejs", {greeting: "Unable to retrieve data:<br>"+error.response.data.error.message, content: "", videos, trendingTitles, trendingThumbnails, trendingIds, page});
        }
    }
    //if trending vids alrd retrieved send the vars to the EJS
    else{
        res.render("index.ejs", {greeting: "Trending Music Videos", content: "" , videos, trendingTitles, trendingThumbnails, trendingIds, page});
    }
    
});

// GET func for /search end point
app.get("/search", async (req, res) => {
    // clear trending vids info to not show in search 
    trendingTitles = [];
    trendingThumbnails = [];
    trendingIds = []
    let page = "/search";
    console.log(req.query.artist, req.query.song)
    // if any query vars are not equal to previous search or array is empty call APIs
    if (req.query.artist !== artist || req.query.song !== song || videos.length === 0){
        artist = req.query.artist;
        song = req.query.song;
        // clear array
        videos =[];
        // replace spaces
        let artistMod = artist.replace(/ /g, '%20');
        let songMod = song.replace(/ /g, '%20');
        let searchWord = artistMod +"%20"+songMod;
        console.log(searchWord, YT_URL);
        try
        {
            // use artist and song name as queris for YT
            const result = await axios.get(YT_URL+searchWord);
            let videoResults = result.data.items;
            videoResults.forEach(video =>{
                // console.log(video);
                videos.push(video.id.videoId);
                
            });

        } catch (error) {
            console.error(error);
        }
        try
        {
            // send get request to lyric api and artist/song endpoint
            const result = await axios.get(LYRIC_URL+artist+"/"+song);
            // console.log(result.data.lyrics);
            lyrics = result.data.lyrics;
            // replace the substring "Paroles de la chanson" and "par" from the beginning of the lyrics with "-"
            lyrics = lyrics.replace(/(^Paroles de la chanson|\bpar\b)/gi, '-');
            // Format the lyrics
            const formattedLyrics = lyrics.replace(/\r?\n/g, "<br>");
            // Wrap the lyrics in <p> tags
            htmlCode = `<p>${formattedLyrics}</p>`;
            res.render("index.ejs", {greeting, content: htmlCode , videos, trendingTitles, trendingThumbnails, trendingIds, page});
        } catch (error) {
          res.render("index.ejs", {greeting, content: JSON.stringify(error.response.data.error), videos, trendingTitles, trendingThumbnails, trendingIds, page});
        }
    }
   else{
    console.log("no redo :)");
    console.log(artist, song)
    res.render("index.ejs", {greeting, content: htmlCode , videos, trendingTitles, trendingThumbnails, trendingIds, page});
   }
    
});

//start server
app.listen(port, ()=>{
    console.log("Server running on port "+port);
});