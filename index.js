const express = require('express');
const routerApi = require('./routes');

const cors = require('cors');

const passport = require('passport');

const {
  errorHandler,
  logErrors,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const { checkApiKey } = require('./middlewares/auth.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000/', 'http://myapp.co', 'localhost'];

const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('No permitido'));
    }
  },
};
app.use(cors(options));

require('./utils/auth');

app.use(passport.initialize());

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, estoy autorizado');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Puerto Corriendo en ${port}`);
});
