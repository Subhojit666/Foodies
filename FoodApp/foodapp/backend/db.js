const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://Foodies:subhojit666@cluster0.55hrpkq.mongodb.net/Foodies?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.db.collection("food_items");
    
    // Using Promise syntax
    const data = await collection.find({}).toArray();
    //console.log("Food Items:", data);

    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    //console.log("Food Categories:", catData);

    global.food_items = data;
    global.foodCategory = catData;
    // console.log("Global Food Items:", global.food_items);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = mongoDB;
