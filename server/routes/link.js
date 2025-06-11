const express = require("express");
const jwt = require("jsonwebtoken");
const Link = require("../models/Link");

const router = express.Router();

// Middleware – Auth kontrolü
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token yok." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(403).json({ message: "Token geçersiz." });
  }
};

// Tüm linkleri getir
router.get("/", auth, async (req, res) => {
  const links = await Link.find({ userId: req.userId }).sort("order");
  res.json(links);
});

// Yeni link oluştur
router.post("/", auth, async (req, res) => {
  const { title, url } = req.body;
  const newLink = new Link({ userId: req.userId, title, url });
  await newLink.save();
  res.status(201).json(newLink);
});

// Link sil
router.delete("/:id", auth, async (req, res) => {
  await Link.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Silindi." });
});

module.exports = router;
