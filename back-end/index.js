const express = require("express");
require("./db/config");
const cors = require("cors");
const app = express();
const Product = require("./db/Product");
const User = require("./db/User");
require("./db/config");
const port = 3600;
const JWT = require("jsonwebtoken");
const JWTKey = "EComm";

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  JWT.sign({ result }, JWTKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Something Went Wrong" });
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      JWT.sign({ user }, JWTKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "Something Went Wrong" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send("No User Found");
    }
  } else {
    resp.send("No User Found");
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: " No Products Find " });
  }
});

app.delete("/product/:id", verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
  console.log(result);
});

app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: " No Record Found " });
  }
});

app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    console.log("Middleware Called if", token);
    JWT.verify(token, JWTKey, (err, sucess) => {
      if (err) {
        resp.status(401).send({ result: "please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token" });
  }
  // console.log("Middleware Called", token[1]);
  // next();
}

app.listen(port);
