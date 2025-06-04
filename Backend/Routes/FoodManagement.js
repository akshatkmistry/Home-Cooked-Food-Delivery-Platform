const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const jwtSecret = "thisisajwtsecret";

// Middleware to verify chef authorization
const verifyChef = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: "Invalid token." });
  }
};

// Add new food item
router.post("/addFoodItem", verifyChef, async (req, res) => {
  try {
    const { name, img, options, CategoryName, description } = req.body;
    
    // Get the food_items collection
    const collection = req.app.locals.db.collection('food_items');
    
    const newFoodItem = {
      name,
      img,
      options,
      CategoryName,
      description
    };

    const result = await collection.insertOne(newFoodItem);
    
    if (result.insertedId) {
      // Update global food_items
      const updatedData = await collection.find({}).toArray();
      global.food_items = updatedData;
      
      res.json({ success: true, message: "Food item added successfully" });
    } else {
      res.status(500).json({ success: false, error: "Failed to add food item" });
    }
  } catch (error) {
    console.error("Error adding food item:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Update food item
router.put("/updateFoodItem/:id", verifyChef, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, options, CategoryName, description } = req.body;
    
    const collection = req.app.locals.db.collection('food_items');
    const ObjectId = require('mongodb').ObjectId;
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          img,
          options,
          CategoryName,
          description
        }
      }
    );

    if (result.modifiedCount > 0) {
      // Update global food_items
      const updatedData = await collection.find({}).toArray();
      global.food_items = updatedData;
      
      res.json({ success: true, message: "Food item updated successfully" });
    } else {
      res.status(404).json({ success: false, error: "Food item not found" });
    }
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Delete food item
router.delete("/deleteFoodItem/:id", verifyChef, async (req, res) => {
  try {
    const { id } = req.params;
    
    const collection = req.app.locals.db.collection('food_items');
    const ObjectId = require('mongodb').ObjectId;
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      // Update global food_items
      const updatedData = await collection.find({}).toArray();
      global.food_items = updatedData;
      
      res.json({ success: true, message: "Food item deleted successfully" });
    } else {
      res.status(404).json({ success: false, error: "Food item not found" });
    }
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
