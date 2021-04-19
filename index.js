const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
require('dotenv').config();

app.use(bodyParser.json())
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ywip5.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
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

    app.get('/orderedBookings', (req, res) => {
        bookingsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.get('/myBookings', (req, res) => {
        bookingsCollection.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents)
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


    app.get('/bookTravel/:id', (req, res) => {
        const id = req.params.id;
        servicesCollection.find({ _id: ObjectID(id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    app.delete('/delete/:id', (req, res) => {
        servicesCollection.deleteOne({ _id: ObjectID(req.params.id) })
            .then(result => {
                // console.log(result);
            })
            .catch(err => {
                console.log(err);
            })
    })

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    //   client.close();
});


app.listen(port)