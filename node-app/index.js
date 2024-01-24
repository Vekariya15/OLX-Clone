const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 4000

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/');

const Users = mongoose.model('Users', { username: String, password: String });




app.get('/', (req, res) => {
  res.send('Hello World!')
})

//signup api
app.post('/signup', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const user = new Users({ username: username, password: password });
  user.save()
    .then(() => {
      res.send({ message: 'saved sucess. .' }
      )
    })
    .catch(() => {
      res.send({ meassage: 'seved err' })
    })
});



//LOgin Api
app.post('/login', (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({ username: username })
    .then((result) => {
      console.log(result, "user data")
      if (!result) {
        res.send({ message: 'User not found. .' })
      }
      else {
        if (result.password == password) {
          const token = jwt.sign({
            data: result
          }, 'MYKEY', { expiresIn: '1h' });
          res.send({ message: 'find sucess. .', token: token })
        }
        else {
          res.send({ message: 'Password wrong' })
        }

      }
    })
    .catch(() => {
      res.send({ meassage: 'seved err' })
    })
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})