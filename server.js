const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Log = require('./models/blogs');

//Connecting to MongoDb
const dbURI = 'mongodb+srv://Vince:YatYat2@chill-logs.klqpyhh.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
   .then((result) => app.listen(3000, () => console.log("Server is up and running")))
   .catch((err) => console.log(err));

//Setting up the view engine (EJS)
app.set('view engine', 'ejs')

//Setting up static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

//Basic routes
app.get('/', (req,res) => {
   Log.find().sort({ createdAt: -1 })
      .then((result) => {
         res.render('home', { blogs: result, title: 'HomePage'})
      }) 
      .catch((err) => {
         console.log(err)
      })
   });

app.delete('/blogs/:id', (req,res) => {
   const id = req.params.id

   Log.findByIdAndDelete(id)
      .then((result) => {
         res.json({ redirect: '/'})
      })
      .catch((err) => console.log(err))
})

app.get('/blogs/create', (req,res) => {
   res.render('create', {title: "Create BlogPost"})
})

app.get('/blogs/:id', (req,res) => {
   const id = req.params.id
   
   Log.findById(id)
      .then(result => {
         res.render('blog', { blog: result, title: 'BlogPost'})
      })
      .catch((err) => console.log(err))
   })

app.post('/',(req,res) => {
   const log = new Log(req.body)

   log.save()
      .then((result) => {
         res.redirect('/')
      })
      .catch((err) => {
         console.log(err)
      })
})

//For pages unfound/non-existent
app.use((req,res) => {
   res.send('<h1>Page not found</h1>')
})