const express = require("express");

const cors = require("cors");

const app = express();

const cookieSession = require("cookie-session");

const { verifySignUp, authJwt } = require("./middlewares");
const auth = require("./controllers/auth");
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
app.use('/api', api, authJwt.verifyToken)
app.use('/api', express.urlencoded({extended: false}))
app.use('/api', express.json())

//Verify authJWT




/* const multer = require("multer");
const cloudinary = require('./config/cloudinary')
const streamifier = require('streamifier')
const fileUpload = multer()

app.post('/upload', fileUpload.single('image'), function (req, res, next) {
  let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
  };

  async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
  }

  upload(req);
}); */



/* const test = (req,res)=>{
  console.log(req)
}

const midd = () =>{
  return cloudinary.uploader.upload("photo",(error,result)=>{
    if(error) console.log(error)
    else return result
  })

} 

app.post(
  '/upload',
  midd,
  test
) */



// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
  console.log(`App listening on port ${PORT}`)
})

module.exports = app;