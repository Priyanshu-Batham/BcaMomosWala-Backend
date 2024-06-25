import app from "./app.js";

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
);
