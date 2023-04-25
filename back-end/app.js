var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const youtubedl = require("youtube-dl-exec");
const { getInfo } = require("ytdl-core");
const compression = require("compression");
const helmet = require("helmet");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["self", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  })
);

app.use("/", indexRouter);
// app.use("/download", downloadRouter);
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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
