const router = require(".");
const {
  createCard,
  getCardById,
  updateCard,
  deleteCard,
  getallCard,
} = require("../db/card.db");
const response = require("../template/response");
const auth = require("../middleware/authorize");

router.get("/", function (req, res) {
  try {
    const user = getallCard();
    if (length(user) == 0) {
      response(404, "not found", "not found", res);
    }
    response(200, user, "success", res);
  } catch (error) {
    if (error.code === 404) {
      response(404, error, "Data Not Found", res);
    } else if (error.code === 500) {
      response(500, error, "Internal Server Error", res);
    } else {
      response(400, error, "Bad Request", res);
    }
  }
});

router.get("/:id", function (req, res) {
  try {
    const user = getCardById(req.params.id);
    if (user == null) {
      response(404, "not found", "not found", res);
    }
    response(200, user, "success", res);
  } catch (error) {
    if (error.code === 404) {
      response(404, error, "Data Not Found", res);
    } else if (error.code === 500) {
      response(500, error, "Internal Server Error", res);
    } else {
      response(400, error, "Bad Request", res);
    }
  }
});

router.post("/create", auth, function (req, res) {
  try {
    const user_id = req.user.id;
    const { title, description, rating, comentar } = req.body;
    const user = createCard(title, description, rating, user_id);
    response(200, user, "success", res);
  } catch (error) {
    if (error.code === 404) {
      response(404, error, "Data Not Found", res);
    } else if (error.code === 500) {
      response(500, error, "Internal Server Error", res);
    } else {
      response(400, error, "Bad Request", res);
    }
  }
});

router.delete("/:id", function (req, res) {
  try {
    const user = deleteCard(req.params.id);
    if (user == null) {
      response(404, "not found", "not found", res);
    }
    response(200, user, "success", res);
  } catch (error) {
    if (error.code === 404) {
      response(404, error, "Data Not Found", res);
    } else if (error.code === 500) {
      response(500, error, "Internal Server Error", res);
    } else {
      response(400, error, "Bad Request", res);
    }
  }
});

module.exports = router;
