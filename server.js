const express = require("express");
const cors = require("cors");
const { json, urlencoded } = require("express");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
