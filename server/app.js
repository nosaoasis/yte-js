const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const cors = require("cors");

app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

// authenticate
const {
  adminUserAuthenticateMiddleware,
} = require("./middleware/authenticate");

// routes
const PostsRoute = require("./routes/post_routes");
const ImagesRoute = require("./routes/images_routes");
const PicturesRoute = require("./routes/pictures_route");
const AdminRoute = require("./routes/admin_routes");

// client side
const ClientRoute = require("./routes/client_routes");
const ClientBlogRoute = require("./routes/blog_routes");
const ClientPostComment = require("./routes/comment_route");
const QuotePostComment = require("./routes/quote_routes");

app.use(express.json({}));
app.use(cors());

app.use("/api/v1/post", PostsRoute);
app.use("/api/v1/images", ImagesRoute);
app.use("/api/v1/admin", AdminRoute);
app.use("/api/v1/pictures", PicturesRoute);
app.use("/api/v1/quotes", QuotePostComment);

// client side
app.use("/api/v1/client", ClientRoute);
app.use("/blog", ClientBlogRoute);
app.use("/api/v1/comments", ClientPostComment);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("app started");
});

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`App started and listening on PORT ${PORT}`)
    );
  } catch (error) {
    console.error(`An error occured. This is the error ${error}`);
  }
};

startApp();
