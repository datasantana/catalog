const express = require('express');
const cors = require('cors');
const routerAPI = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandler.js')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:8080', '*']; // List of allowed domains. To add all domains, use ['*']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions)); // Enable CORS with options

app.get('/', (req, res) => {
  res.send('Map catalog');
});

routerAPI(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
