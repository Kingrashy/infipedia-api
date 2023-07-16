import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import PostRoute from "./routes/Posts.js";
import VideoRoute from "./routes/Videos.js";
import UsersRoute from "./routes/Users.js";
import mongoose from "mongoose";
import AuthRoute from "./routes/Auth.js";
import CRoutes from "./routes/Community.js";
import ChatRoute from "./routes/Chat.js";
import MessageRoute from "./routes/Message.js";
import TagRoute from "./routes/Tag.js";
import NotRoute from "./routes/Notification.js";
import DevRoute from "./routes/Dev.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "80mb" }));
app.use(bodyParser.json({ limit: "80mb" }));
app.use(bodyParser.urlencoded({ limit: "80mb", extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from home");
  console.log("Home entered");
});

// Routes
app.use("/posts", PostRoute);
app.use("/videos", VideoRoute);
app.use("/auth", AuthRoute);
app.use("/users", UsersRoute);
app.use("/community", CRoutes);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);
app.use("/tag", TagRoute);
app.use("/notification", NotRoute);
app.use("/dev", DevRoute);

const Port = process.env.PORT || 4001;
app.listen(Port, () => console.log(`Sever Runing on http://localhost:${Port}`));

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb conection success"))
  .catch((err) => console.log(`Concetion failed :`, err));
