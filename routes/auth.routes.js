module.exports = app => {
    const auth = require("../controllers/auth.controller");

    // Retrieve all products
    app.get("/login", auth.login);
};