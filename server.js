const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://juizii:demodemo@cluster0.thiykna.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    db = client.db('list')
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

connectToDB();


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.listen(3000, () => {
console.log("Conected to Prt 3000")
});
app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({date: req.body.date , name: req.body.name }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  db.collection('messages').updateOne(
    { date: req.body.date, name: req.body.name },
    { $set: { hbd: "🎂" } },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
})


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({date: req.body.date, name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})

app.delete('/messages/all', (req, res) => {
  db.collection('messages').deleteMany((err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})