const express = require("express");

const cors = require("cors");

const app = express();

const path = require('path');

const cookieSession = require("cookie-session");

const { verifySignUp, authJwt } = require("./middlewares");
const auth = require("./controllers/auth");


app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cram application." });
});


const multer = require("multer");

const test = require('./routes/test')

// Register and set up the middleware
app.use('test',express.urlencoded({ extended: true }));

app.use('/test',test)





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
//app.use('/api', api, authJwt.verifyToken) NECESARIO PARA TODAS LAS RUTAS (VERIFICA QUE EL USUARIO PROVIENE DEL LOGIN DE NUESTRA APP)
app.use('/api', api)
app.use('/api', express.urlencoded({extended: true}))
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
app.set("port",process.env.PORT || 4000);

module.exports = app;
