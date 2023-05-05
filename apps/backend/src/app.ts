import express from 'express';
import path from 'path';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

export default app;
