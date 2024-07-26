import express from 'express';
import router from './routes';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(cors({
  origin: '*', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(bodyParser.json());

// Use the router
app.use('/', router);


app.listen(port, () => {

  console.log(`Server is running at http://localhost:${port}`);
});
