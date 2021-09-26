const dotenv = require('dotenv');
const result = dotenv.config()

const { handleError } = require('./services/ErrorHandlers.service')

if (result.error) {
  throw result.error
}

console.log(result.parsed)

// init dbConn fro mongoose
require('./services/mongooseConnect.service')


const express = require('express')
const app = express()


const mainRouter = require('./main.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  const date = new Date()
  const formattedDate = date.toLocaleString('en-US', { timeZone: 'UTC' })
  res.json({ message: 'Server On-line: ' + formattedDate });
});

app.use('/api', mainRouter);

app.use(handleError)



const PORT = process.env.PORT || 8085;

app.listen(PORT, () => { console.log('server ready on port:', PORT) })