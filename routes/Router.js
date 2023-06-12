const express = require("express");
const router = express();
router.use("/api/users", require("./usersRoute"));

// test route
router.get("/", (req, res) => {
  res.send("Api Working!");
});

module.exports = router;
