var express = require('express');
var router = express.Router();
const userModel = require('../models/user');


/* routes  /users/.... */


router.post('/sign-up', async function(req, res) {
  const name = req.body.name;
  const firstName = req.body.firstName;
  const email = req.body.email;
  const password = req.body.password;
  
  if (!name || !firstName || !email || !password) {
    return res.send('You need to provide all the information');
  }

  const exisitingEmail = await userModel.findOne({ email: email });
  if (!exisitingEmail) {
    const newUser = new userModel({
      name: name,
      firstName: firstName,
      email: email,
      password: password
    })
    const savedUser = await newUser.save();

    req.session.user = {
      name: savedUser.name,
      id: savedUser._id,
      trips: []
    };
    return res.redirect('/');
  } else {
    return res.send('This email is already registrered');
  }
});

router.post('/sign-in', async (req, res) => {
  const searchUser = await userModel.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if(searchUser != null){
    req.session.user = {
      name: searchUser.name,
      id: searchUser._id
    };
    return res.redirect('/');
  }
  return res.redirect('/login');
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/login');
})




module.exports = router;
