import express from "express";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// add tea in the list
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all teas in the list
app.get("/tea", (req, res) => {
  res.status(200).send(teaData);
});

//get a specific tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;

  res.status(200).send(tea);
});

//delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: http://localhost:${port}...`);
});
