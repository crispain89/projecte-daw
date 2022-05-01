const express = require("express");

const cors = require("cors");

const app = express();

const cookieSession = require("cookie-session");

const { verifySignUp } = require("./middlewares");
const controller = require("./controllers/auth");
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cram application." });
});

//Set up cookie
app.use(
  cookieSession({
    name: "cram-session",
    // keys: ['key1', 'key2'], 
    secret: process.env.SECRET_COOKIE, // should use as secret environment variable
    httpOnly: true
  })
);

// App routes - API
const api = require('./routes/api')
app.use('/api', api)
app.use('/api', express.urlencoded({extended: false}))
app.use('/api', express.json())

app.post(
  "/api/auth/register",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
  ],
  controller.signup
);
app.post("/api/auth/login", controller.signin);
app.post("/api/auth/signout", controller.signout);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})

module.exports = app;