const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

// MongoURI
const MongoURI =
  "mongodb+srv://ziotime123:Q68hZdkyDM0Dupq5@ziotime.kmdbj51.mongodb.net/list?retryWrites=true&w=majority";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MongoURI);

//Barang Model
const Barang = require("./models/barang");

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

const router = express.Router();

router.get("/", async (req, res) => {
    try {
      // Ambil data dari database (misalnya, semua data dari model Barang)
      const dataBarang = await Barang.find();
  
      // Kirim data ke tampilan EJS
      res.render("dashboard", { dataBarang });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving data from the database");
    }
  });
  
router.get("/", (req, res) => {
  res.render("dashboard");
});


//CRUD OPERATION
router.post("/addbarang", async (req, res) => {
    try {
      const { nama, keterangan, jumlah } = req.body;
      const newBarang = new Barang({ nama, keterangan, jumlah });
      await newBarang.save();
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.redirect("/"); // Consider changing to "/alatmasuk" if it's intended
    }
  });

  router.get('/delete-barang', async (req, res) => {
    try {
        const barangId = req.query.barangId;

        const result = await Barang.findByIdAndDelete(barangId);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});

router.post('/update-barang/:id', async (req, res) => {
    try {
        const { nama, keterangan, jumlah } = req.body;
        const barangId = req.params.id;  // Use req.params.id to get the ID from the URL

        const updateBarang = await Barang.findByIdAndUpdate(
            barangId,
            { nama, keterangan, jumlah },
            { new: true }
        );

        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating data in the database");
    }
});




app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
