const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


const PORT = config.port;
connectDB();

app.use(cors({
    credentials: true,
    origin: config.origin
}))
app.use(express.json());
app.use(cookieParser())


app.get("/", (req,res) => {
    res.json({message : "Hello from POS Server!"});
})

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/table", require("./routes/tableRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.use(globalErrorHandler);


app.listen(PORT, () => {
    console.log(`☑️  POS Server is listening on port ${PORT}`);
})