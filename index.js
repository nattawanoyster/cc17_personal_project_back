require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./src/routes/auth-route");
const homeRoute = require("./src/routes/home-route");
const authenticate = require("./src/Middlewares/authenticate");
const notFoundMiddleware = require("./src/Middlewares/notFound");
const errorMiddleware = require("./src/Middlewares/error-middleware");
const cors = require("cors");

app.use(express.json());
app.use(cors());
// app.use("/", );
app.use("/auth", authRoute);

// app.use("/home", authenticate, homeRoute);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is working on ${PORT}`));
