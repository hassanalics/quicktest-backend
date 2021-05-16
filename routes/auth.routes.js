module.exports = app => {
    const auth = require("../controllers/auth.controller");

    // Retrieve all products
    app.post("/login", auth.login);
};