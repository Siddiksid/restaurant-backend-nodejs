const express = require("express");
const router = express.Router();
const Menu = require("../models/menuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newItem = new Menu(data);
    const response = await newItem.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Menu.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/taste/:taste", async (req, res) => {
  const tasteType = req.params.taste;
  try {
    console.log(tasteType);
    if (
      tasteType === "sweet" ||
      tasteType === "sour" ||
      tasteType === "bitter"
    ) {
      const response = await Menu.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      console.log("taste not found");
      res.status(404).json({ error: "taste not found" });
    }
  } catch (error) {
    console.log("The error is", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;
    if (["sweet", "sour", "bitter"].includes(tasteType)) {
      const response = await Menu.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "taste not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
