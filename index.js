import express from "express";
import cors from 'cors';
import RestAPIRouter from './routes/programming.js';

const app = express();
app.use(cors());
const PORT = 443;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.json({ message: 'ok' })
})
app.use("/rest-api", RestAPIRouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(PORT, () => {
    console.log(`Rest api Web service app listening on :${PORT}`)
})