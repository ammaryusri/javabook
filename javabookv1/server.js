const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Create or read the db.json file and initialize the favorites array
let dbFileContent = [];
if (fs.existsSync("db.json")) {
  const dbFile = fs.readFileSync("db.json");
  try {
    dbFileContent = JSON.parse(dbFile);
  } catch (error) {
    console.error("Error parsing db.json:", error);
  }
}

const favorites = dbFileContent;

// Function to write favorites array to db.json
const saveFavoritesToDB = () => {
  fs.writeFile("db.json", JSON.stringify(favorites), (err) => {
    if (err) {
      console.error("Error saving favorites to db.json:", err);
    }
  });
};

app.post("/api/favorites", (req, res) => {
  const { item } = req.body;
  if (item) {
    favorites.push(item);
    saveFavoritesToDB();
  }
  res.json(favorites);
});

app.delete("/api/favorites/:item", (req, res) => {
  const itemID = parseInt(req.params.item, 10); // Convert to number
  console.log("Requested itemID:", itemID);

  const index = dbFileContent.findIndex((item) => item.key === itemID);
  console.log("Index found:", index);

  if (index !== -1) {
    dbFileContent.splice(index, 1);
    saveFavoritesToDB();
  }

  console.log("Updated dbFileContent:", dbFileContent);
  res.json(favorites);
});

app.get("/api/favorites", (req, res) => {
  res.json(favorites);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
