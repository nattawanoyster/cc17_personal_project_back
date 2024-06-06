require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./src/routes/auth-route");
const notFoundMiddleware = require("./src/Middlewares/notFound");
const errorMiddleware = require("./src/Middlewares/error-middleware");

app.use(express.json());

// app.use("/", );
app.use("/auth", authRoute);
//app.use("/users", () => {});

app.use(notFoundMiddleware);

app.use(errorMiddleware);

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is working on ${PORT}`));
