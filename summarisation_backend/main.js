const express = require('express');

const app = express();
const port = 8000;
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
var jwt = require('jsonwebtoken');
var jwt_secret = "my secret";

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://KumudSharma:VwbD0xUqFIaqhObm@cluster0.r10qm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

let database;

client.connect().then(function (data) {
  console.log("connection is on");
  database = client.db('sample_mflix');

  app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
  });

}).catch(function (err) {
  console.log(err, "error");
})

app.get('/', (req, res) => {
  res.send('Hello World');
});

//SignUp
app.post('/signup', (req, res) => {
  var body = req.body;
  console.log(body);
  var userName = body.userName;
  var email = body.email;
  var password = body.password;

  let table = database.collection("users");

  table.find({ email: email }).toArray(function (err, existing_user) {
      if (err) {
          res.json({ error: err });
      }
      else {
          if (existing_user.length) {
              res.json({ error: "user already exists" });
          }
          else {
              var key = uuidv4();
              var user = {
                  userName: userName,
                  email: email,
                  password: password
              }

              jwt.sign({ profile: user }, jwt_secret, {}, function (err, token) {
                  console.log(err, token);
                  table.insertOne(user, function (err) {
                      if (err) {
                          res.json({ error: err });
                      }
                      else {
                          res.json({ status: "success", token: token });
                          console.log(key, 123);
                      }
                  });
              });
          }
      }
  });
})

//Login
app.post('/signIn', (req, res) => {
  var body = req.body;
  var email = body.email;
  var password = body.password;

  let table = database.collection("users");

  table.find({ $and: [{ email: email }, { password: password }] }).toArray(function (err, existing_user) {
      if (err) {
          res.json({ error: err });
      }
      else {
          if (!existing_user.length) {
              res.json({ error: "Invalid username or password" });
          }
          else {
              jwt.sign({ profile: existing_user[0] }, jwt_secret, {}, function (err, token) {
                  console.log(err, token);
                  res.json({ status: "success", token: token });
              });
          }
      }
  });
})

app.post('/', (req, res) => {
    var body = req.body;
    var token = body.token;
    console.log(token, "token");
    if (token) {
        let table = database.collection("users");
        jwt.verify(token, jwt_secret, function (err, token) {
            console.log(token, 131);
            table.find({ email: token.profile.email }).toArray(function (err, existing_user) {
                if (err) {
                    res.json({ error: err });
                }
                else {
                    if (existing_user.length) {
                        req.profile = existing_user[0];
                    }
                    else {
                        req.profile = {};
                    }

                    console.log(req.profile);
                    if (req.profile) {
                        res.json({status: "registered"});
                    }
                    else {
                        res.json({ error: "not registered" });
                    }
                }
            });
        });
    }
    else {
        res.json({ error: "not registered"});
    }
})

app.post('/getArticleSummary', (req, res) => {
  
})
