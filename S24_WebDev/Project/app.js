import express from "express";
import axios from "axios";
// import {dirname} from "path";


//get current url path of current directory
// const __dirname = dirname(fileURLToPath(import.meta.url));

//get API Key
const YT_API_KEY = process.env.YT_API_KEY;
//establish server information
const port = process.env.PORT;
const LYRIC_URL = "https://api.lyrics.ovh/v1/";
let YT_URL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&regionCode=US&type=video&key="+YT_API_KEY+"&q=";
const TRENDING_URL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=music%20video&regionCode=US&key="+YT_API_KEY;

const app = express();
//middleware - bodyParser gives a .body to both req and res
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
const greeting = "Star Lyrics";

let videos = [];
let trendingTitles = [];
let trendingThumbnails = [];
let trendingIds = []
let artist = "";
let song = "";
let htmlCode = "";
let lyrics = "";

const htmlEntitiesMap = {
    '&quot;': '"',
    '&#39;': "'",
    // Add more entities and their replacements as needed
};

//LANDING PAGE
app.get("/", (req, res) =>{
    res.render("stars.ejs");
})

//get for when '/' is accessed
app.get("/home", async (req, res) => {
    let page = "/home";
    videos = [];
    if (trendingThumbnails.length ===0){
        try{
            const {result, err} = await axios.get(TRENDING_URL);
            // get thumbnails, titles and ids from videos
            let videoResults = result.data.items;
            videoResults.forEach(video =>{
                console.log(video);
                trendingThumbnails.push(video.snippet.thumbnails.default.url);
                trendingTitles.push(video.snippet.title);
                trendingIds.push(video.id.videoId)
            });
            res.render("index.ejs", {greeting, content: "Search Lyrics" , videos, trendingTitles, trendingThumbnails, trendingIds, page});
            if(err) throw {err};
        } catch (error) {
            console.error(error);
            res.render("index.ejs", {greeting, content: error, videos, trendingTitles, trendingThumbnails, trendingIds, page});
        }
    }
    else{
        console.log("smile");
        res.render("index.ejs", {greeting, content: "Search Lyrics" , videos, trendingTitles, trendingThumbnails, trendingIds, page});
    }
    
});

app.get("/search", async (req, res) => {
    trendingTitles = [];
    trendingThumbnails = [];
    trendingIds = []
    let page = "/search";
    console.log(req.query.artist, req.query.song)
    if (req.query.artist !== artist && req.query.song !== song){
        artist = req.query.artist;
        song = req.query.song;
        videos =[];
        let artistMod = artist.replace(/ /g, '%20');
        let songMod = song.replace(/ /g, '%20');
        let searchWord = artistMod +"%20"+songMod;
        console.log(searchWord, YT_URL);
        try
        {
            const {result, err} = await axios.get(YT_URL+searchWord);
            // Replace newlines with HTML line breaks
            let videoResults = result.data.items;
            videoResults.forEach(video =>{
                // console.log(video);
                videos.push(video.id.videoId);
                
            });
            if(err) throw {err};
        } catch (error) {
            console.error(error);
        }
        try
        {
            const result = await axios.get(LYRIC_URL+artist+"/"+song);
            // Replace newlines with HTML line breaks
            // console.log(result.data.lyrics);
            lyrics = result.data.lyrics;
            // Remove the substring "Paroles de la chanson" from the beginning of the lyrics
            lyrics = lyrics.replace(/(^Paroles de la chanson|\bpar\b)/gi, '-');
            // lyrics = lyrics.replace(/^Paroles de la chanson\s*/i, '');
            // Format the lyrics
            const formattedLyrics = lyrics.replace(/\r?\n/g, "<br>");
            // Wrap the lyrics in <p> tags
            htmlCode = `<p>${formattedLyrics}</p>`;
            res.render("index.ejs", {greeting, content: htmlCode , videos, trendingTitles, trendingThumbnails, trendingIds, page});
        } catch (error) {
          res.render("index.ejs", {greeting, content: JSON.stringify(error.response.data), videos, trendingTitles, trendingThumbnails, trendingIds, page});
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