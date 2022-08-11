const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let data = { id: 1, name: "Iphone", price: 29000 };
  res.send(data);
});
app.listen(port, () => console.log(`Port:${port}. Server is up...`));
