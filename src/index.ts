import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const prefix = (host: String) => {
  return host.split(".")[0];
};

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/products", async (req, res) => {
  console.log(req.headers.host);
  const products = await prisma[
    `${prefix(req.headers.host)}Product`
  ].findMany();
  res.send(products);
});

app.post("/api/products", async (req, res) => {
  const product = await prisma[`${prefix(req.headers.host)}Product`].create({
    data: {
      title: req.body.title,
      price: req.body.price,
    },
  });

  res.send(product);
});

app.listen(8000);
