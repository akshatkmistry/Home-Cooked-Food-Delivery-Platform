const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://Akshat:akshat123@infotactcluster.tl3ahio.mongodb.net/?retryWrites=true&w=majority&appName=InfotactCluster";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");

    // Fetch food items
    const fetched_data = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    global.food_items = fetched_data;
    console.log("Food items loaded:", global.food_items.length);

    // Fetch food categories with correct collection name
    const foodCategory = await mongoose.connection.db
      .collection("food_category")
      .find({})
      .toArray();
    global.food_category = foodCategory;
    console.log("Food categories loaded:", global.food_category.length);

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};

module.exports = mongoDB;