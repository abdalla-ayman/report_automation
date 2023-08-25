const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const path = require("path");

const app = express();
const PORT = 3000 || proccess.env.PORT;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://abdalla:abdalla123@cluster0.rw9lh75.mongodb.net/?retryWrites=true&w=majority"
    );

    // middlewares
    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "dist")));

    app.use("/api", routes);
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
    app.listen(PORT, () => console.log("server is running"));
  } catch (error) {
    console.log(error);
  }
}

main();
