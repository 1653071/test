import express from "express"
import { walk } from "./routes/index.route"
const app = express()
walk("./routes", app)