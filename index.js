const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID

app.use(bodyParser.json())
app.use(cors());


const uri = "mongodb+srv://travelMarvel360:superTravelNewYork201@cluster0.ywip5.mongodb.net/travel360?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const servicesCollection = client.db("travel360").collection("services");
    const adminsCollection = client.db("travel360").collection("admins");
    const bookingsCollection = client.db("travel360").collection("bookings");
    const reviewsCollection = client.db("travel360").collection("reviews");

    app.post('/addService', (req, res) => {
        const services = req.body;
        servicesCollection.insertOne(services)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
        .then(err => {
            console.log(err);
        })
    })

    app.post('/addAdmins', (req, res) => {
        const admin = req.body;
        adminsCollection.insertOne(admin)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
        .then(err => {
            console.log(err);
        })
    })

    app.post('/bookings', (req, res) => {
        const bookings = req.body;
        bookingsCollection.insertOne(bookings)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
        .then(err => {
            console.log(err);
        })
    })

    app.post('/addReview', (req, res) => {
        const reviews = req.body;
        reviewsCollection.insertOne(reviews)
        .then(result => {
            res.send(result.insertedCount > 0)
        })
        .then(err => {
            console.log(err);
        })
    })

    app.get('/services', (req, res) => {
        servicesCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/admins', (req, res) => {
        adminsCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })

    app.get('/reviews', (req, res) => {
        reviewsCollection.find({})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })


    app.get('/bookTravel/:id', (req,res) => {
        const id = req.params.id;
        servicesCollection.find({_id: ObjectID(id)})
        .toArray((err, documents) => {
            res.send(documents[0]);
        })
    })

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    //   client.close();
});


app.listen(port)