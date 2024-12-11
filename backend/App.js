var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const multer = require("multer");
const path = require("node:path");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));

const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "aaron",
  password: "makena@1998",
  database: "final",
});

const port = "8081";
const host = "localhost";

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });
const fs = require("fs");
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

app.get("/product", (req, res) => {
  try {
    db.query("SELECT * FROM prod", (err, result) => {
      if (err) {
        console.error({ error: "Error reading all posts:" + err });
        return res
          .status(500)
          .send({ error: "Error reading all products" + err });
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.error({ error: "An unexpected error occurred" + err });
    res.status(500).send({ error: "An unexpected error occurred" + err });
  }
});

app.get("/cart", (req, res) => {
  try{
    db.query("SELECT * FROM prod WHERE amount > 0", (err, result) => {
      if (err) {
        console.error({ error: "Error reading all posts:" + err });
        return res
          .status(500)
          .send({ error: "Error reading all products" + err });
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.error({ error: "An unexpected error occurred" + err });
    res.status(500).send({ error: "An unexpected error occurred" + err });
  }
})

app.get("/product/name", (req, res) => {
  const { product_name } = req.query;

  if (!product_name) {
    return res.status(400).send({ error: "product_name is required" });
  }
  const query = "SELECT * FROM prod WHERE LOWER(name) LIKE LOWER(?)";
  const searchValue = `%${product_name}%`; 

  try {
    db.query(query, [searchValue], (err, result) => {
      if (err) {
        console.error("Error fetching products:", err);
        return res.status(500).send({ error: "Error fetching products" });
      }
      res.status(200).send(result);
    });
  } catch (err) {
    console.error({
      error: "An unexpected error occurred in GET by name" + err,
    });
    res
      .status(500)
      .send({ error: "An unexpected error occurred in GET by name" + err });
  }
});

app.post("/product", upload.single("image"), (req, res) => {
  const { name, description,price,amount, type } = req.body;
  const img = req.file ? `/images/${req.file.filename}` : null;

  const checkQuery = `SELECT * FROM prod WHERE name = ?`;
  db.query(checkQuery, [name], (checkErr, checkResult) => {
    if (checkErr) {
      console.error("Database error during validation:", checkErr);
      return res
        .status(500)
        .send({ error: "Error checking product name: " + checkErr.message });
    }
    if (checkResult.length > 0) {
      return res.status(409).send({ error: "product name already exists." });
    }
  });

  const query =
    "INSERT INTO prod (name ,img ,description , price, amount, type) VALUES (?, ?, ?, ?, ?, ?)";
  try {
    db.query(
      query,
      [name,img, description,  price,amount,type],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Error adding product" + err });
        } else {
          res.status(201).send("product added successfully");
        }
      }
    );
  } catch (err) {
    console.error("Error in POST /product:", err);
    res
      .status(500)
      .send({ error: "An unexpected error occurred: " + err.message });
  }
});

app.delete("/product/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM prod WHERE id = ?";
  try {
    db.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ err: "Error deleting product" });
      } else if (result.affectedRows === 0) {
        res.status(404).send({ err: "product not found" });
      } else {
        res.status(200).send("product deleted successfully");
      }
    });
  } catch (err) {
    console.error("Error in DELETE /prod:", err);
    res.status(500).send({
      error: "An unexpected error occurred in DELETE: " + err.message,
    });
  }
});

app.put("/product/:id", (req, res) => {
  const id = req.params.id;
  const {amount}=req.body;
  const query = `
  UPDATE prod
  SET amount = ?
  WHERE id = ?
  `;

  try {
    db.query(
      query,
      [amount, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ err: "Error updating product" });
        } else if (result.affectedRows === 0) {
          res.status(404).send({ err: "product not found" });
        } else {
          res.status(200).send("product updated successfully");
        }
      }
    );
  } catch(err) {
    console.error("Error in UPDATE /product:", err);
    res.status(500).send({
      error: "An unexpected error occurred in UPDATE: " + err.message,
    });
  }
});

app.put("/cart/:id", (req, res) => {
  const id = req.params.id;
  const {amount}=req.body;
  const query = `
  UPDATE prod
  SET amount = ?
  WHERE id = ?
  `;

  try {
    db.query(
      query,
      [amount, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({ err: "Error updating product" });
        } else if (result.affectedRows === 0) {
          res.status(404).send({ err: "product not found" });
        } else {
          res.status(200).send("product updated successfully");
        }
      }
    );
  } catch(err) {
    console.error("Error in UPDATE /product:", err);
    res.status(500).send({
      error: "An unexpected error occurred in UPDATE: " + err.message,
    });
  }
});
