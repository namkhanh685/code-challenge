import express from "express";
import productController from "@controllers/productController";
import { errorHandler } from "@middlewares/errorHandler";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/products", productController);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
