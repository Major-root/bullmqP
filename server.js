const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });

const port = process.env.PORT || 8096;

app.listen(() => {
  console.log(`App running on Port; ${port}`);
});
