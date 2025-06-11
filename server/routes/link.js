const express = require("express");
const jwt = require("jsonwebtoken");
const Link = require("../models/Link");
const User = require("../models/User");

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

// PUBLIC: Kullanıcının herkese açık linklerini getir
router.get("/public/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

  const links = await Link.find({ userId: user._id }).sort("order");
  res.json({ username: user.username, links });
});

// KULLANICIYA AİT KENDİ LİNKLERİNİ GETİR
router.get("/mine", auth, async (req, res) => {
  try {
    const links = await Link.find({ userId: req.userId }).sort("order");
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: "Linkler alınamadı.", error: err });
  }
});


module.exports = router;
