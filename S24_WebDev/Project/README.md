# StarLy - Lyrics Website

This is a web application that allows users to search for song lyrics.

## Features

- **Search Lyrics**: Users can search for song lyrics using the artist and song title.


## Deployed Website

StarLy is deployed at https://starly.onrender.com 

## Install Locally

1. Clone this repository.
2. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add the following variables:

   ```plaintext
   YOUTUBE_API_KEY=your_youtube_api_key_here
   PORT=3000
   ```

   Replace `your_youtube_api_key_here` with your own YouTube Data API key. Read the documentation [here](https://developers.google.com/youtube/v3/getting-started) to acquire and activate your API key.

4. Run the application:

   ```bash
   node --env-file=.env app.js 
   ```

5. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## Dependencies

- [Express](https://expressjs.com/): Web framework for Node.js.
- [EJS](https://ejs.co/): Templating engine for generating HTML markup with JavaScript.
- [Axios](https://github.com/axios/axios): Promise-based HTTP client for making requests to APIs.

## APIs Used

- **Lyrics.ovh API**: This API is used to fetch song lyrics. [API Documentation](https://lyricsovh.docs.apiary.io/#reference/0/lyrics-of-a-song/search?console=1)
- **YouTube Data API v3**: This API is used to fetch additional information about trending songs and embed music videos.

## Usage

1. Enter the artist and song name in the respective fields to search for song lyrics.

## Credits

- **Falling Stars Animation**: The Falling Stars animation effect used in this website is inspired by a tutorial by Online Tutorials. [Tutorial Link](https://youtu.be/4jmjXAC4gq0?si=QYdIAIG6H6RFLydY)
- **Text Animation**: The text animation effect used for the site name is adapted from Elisabeth Diang's CSS Text Animation, available on [Slider Revolution](https://www.sliderrevolution.com/resources/css-text-animation/).
- **Background Image**: The background image utilized in this website is sourced from Vecteezy's collection of music vectors. You can find it [here](https://www.vecteezy.com/free-vector/music").