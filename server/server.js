const express = require('express');
const cors = require('cors');

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
}));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}!`);
});
