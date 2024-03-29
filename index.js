const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

//Used to parse JSON bodies
app.use(express.json());

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// set port, listen for requests
const PORT = process.env.PORT || 3000;

require("./routes/product.routes")(app);
require("./routes/auth.routes")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Quick Test." });
});


