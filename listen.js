const app = require('./app');

const PORT = process.env.PORT || 9090;

app.listen(PORT, err => {
  if (err) console.log('error encounted: ', err);
  else console.log(`server listening on port ${PORT}`);
});
