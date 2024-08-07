const response = require("../utils/response");
const auth = require("../middleware/authorize");
const {
  createCard,
  getCardById,
  updateCard,
  deleteCard,
  getallCard,
  getCardByUrlApi,
  getallByUser,
} = require("../db/card.db");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const card = await getallCard();
    if (card == null) {
      return response(404, {}, "not found", res);
    }
    return response(200, card, "success", res);
  } catch (error) {
    return response(500, error, "Internal Server Error", res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const card = await getCardById(req.params.id);
    if (card == null) {
      return response(404, "not found", "not found", res);
    }
    return response(200, card, "success", res);
  } catch (error) {
    return response(500, error, "Internal Server Error", res);
  }
});

router.get("/user/:id", auth, async (req, res) => {
  try {
    const card = await getallByUser(req.user.id);
    if (card == null) {
      return response(404, "not found", "not found", res);
    }
    return response(200, card, "success", res);
  } catch (error) {
    return response(500, error, "Internal Server Error", res);
  }
});

router.post("/create", auth, async function (req, res) {
  try {
    const user_id = req.user.id;
    const { title, description, rating, urlapi } = req.body;
    if (user_id == null) {
      return response(404, "not found", "not found", res);
    }
    const url = await getCardByUrlApi(urlapi);
    if (url) {
      return response(400, "url api already exist", "Bad Request", res);
    }
    createCard(title, description, rating, user_id, urlapi);
    return response(200, {}, "success", res);
  } catch (error) {
    return response(500, error, "Internal Server Error", res);
  }
});

router.delete("/delete/:id", async function (req, res) {
  try {
    const card = await getCardById(req.params.id);
    if (card == null) {
      return response(404, "not found", "not found", res);
    }
    deleteCard(req.params.id);
    return response(200, user, "success", res);
  } catch (error) {
    return response(500, error, "Internal Server Error", res);
  }
});

module.exports = router;
