const mongoose = require('mongoose');
const { DBLogin } = require('../env');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// --------------------- BDD -----------------------------------------------------
mongoose.connect(`mongodb+srv://${DBLogin}.i1v1m.mongodb.net/Ticketac?retryWrites=true&w=majority`,
  options,
  function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Ticketac connection : Success ***');
    }
  }
);