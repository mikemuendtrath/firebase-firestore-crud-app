var request = require('request');
const crypto = require("crypto");
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const fs = require('firebase-admin');
const serviceAccount = require('./cert.json');
fs.initializeApp({
 credential: fs.credential.cert(serviceAccount)
});
const db = fs.firestore();
const firestoreCollection = "Data"

app.post('/create', async (req,res) =>{
    try {
        const response = await db.collection(firestoreCollection).doc(req.body.userid+":"+req.body.id).set(req.body)
        res.end(JSON.stringify(response))
    } catch (error) {
        console.log(error)
    }
})

app.post('/read', async (req,res) =>{
    try {
        var result = []
        const response = await db.collection(firestoreCollection).where("userid", "==",  req.body.userid).get();
        response.forEach(doc => {
            result.push(doc.data())
          });
        res.end(JSON.stringify(result))
    } catch (error) {
        res.send(error)
    }
})

app.post('/update', async (req,res) =>{
    try {
        var result = []
        const response = await db.collection(firestoreCollection).doc(req.body.userid+":"+req.body.id).set(req.body);
        res.end(JSON.stringify(response))
    } catch (error) {
        res.send(error)
    }
})

app.post('/delete', async (req,res) =>{
    try {
        const response = await db.collection(firestoreCollection).doc(req.body.userid+":"+req.body.id).delete();
        res.end(JSON.stringify(response))
    } catch (error) {
        res.send(error)
    }
})

app.listen(5000, () => console.log(' app is listening on port 5000.'));