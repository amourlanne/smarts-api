import uuidv4 from 'uuid/v4';

export default {
  name: 'smarts_user_session',
  genid: function() {
    return uuidv4(); // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: false,
};
