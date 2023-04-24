const express = require("express");
const app = express();
const PORT = 3000;
const youtubedl = require("youtube-dl-exec");
const cors = require("cors");
const { getInfo } = require("ytdl-core");

// TO HANDLE JSON RESPONSE AND CORS ERROR
app.use(express.json(), cors());

// API ROUTE THAT HANDLES THE VIDEO OR AUDIO DOWNLOAD REQUEST
app.post("/download", async (req, res) => {
  let title = "";

  // GETS THE VIDEO TITLE USING YTDL-CORE LIB
  await getInfo("https://www.youtube.com/watch?v=v7BddpYYNGk").then((info) => {
    title = info.videoDetails.title;
  });

  // DOWNLOADS THE VIDEO AND CHECKS SEVERAL PARAMETERS EITHER FOR VIDEO OR AUDIO
  await youtubedl(req.body?.link, {
    extractAudio: req.body.type === "audio" ? true : null,
    o: `${title}.${req.body.type === "video" ? "mp4" : "mp3"}`,
    audioFormat: req.body.type === "audio" ? "mp3" : null,
    f: req.body.type === "video" ? "mp4" : null,
  })
    .then(() => {
      // SENDS RESPONSE TO CLIENT ON SUCCESS
      res.send({ response: "Successfully downloaded the content" });
    })
    .catch(() => {
      // SENDS RESPONSE TO CLIENT ON ERROR
      res.send({ response: "Error Occurred!" });
    });
});

// LISTENS THE SERVER ON SPECIFIED PORT
app.listen(PORT, () => {
  console.log("SERVER IS LIVE ON " + PORT);
});
