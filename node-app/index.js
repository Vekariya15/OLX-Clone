const express = require('express')
const cors = require('cors')
const path=require('path')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({ storage: storage })
const app = express()
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/');

const Users = mongoose.model('Users', { username: String, password: String });
const Products = mongoose.model('Products', { pname: String, pdesc: String, price: String, category: String, pimage: String });



app.get('/', (req, res) => {
  res.send('Hello World!')
})

//ADD product api

app.post('/add-product', upload.single('pimage'), (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const pimage = req.file.path;

  const product = new Products({ pname: pname, pdesc: pdesc, price: price, category: category, pimage: pimage });
  product.save()
    .then(() => {
      res.send({ message: 'saved sucess. .' }

      )
    })
    .catch(() => {
      res.send({ meassage: 'seved err' })
    })

})


//get product
app.get('/get-products', (req, res) => {
  Products.find()
    .then((result) => {
      console.log(result, "user data");
      res.send({ message: 'sucess. .', Products: result })
    })
    .catch((err) => {
      res.send({ meassage: 'seved err' })
    })

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
    .catch((err) => {
      res.send({ meassage: 'seved err' })
    })
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})