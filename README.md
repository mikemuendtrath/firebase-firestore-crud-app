# firebase-firestore-crud-app
Simple CRUD application focused on interacting with firebase

## Setup Node.js backend
Soon
## Setup React frontend
Soon
## Firebase firestore operations
Create a new record:
```javascript
app.post('/create', async (req,res) =>{
    try {
        const response = await db.collection("YOUR_COLLECTION").doc("YOUR_DOCUMENT").set(req.body)
        res.end(JSON.stringify(response))
    } catch (error) {
        console.log(error)
    }
})
```
Read records whrehre field is equal:
```javascript
app.post('/read', async (req,res) =>{
    try {
        var result = []
        const response = await db.collection("YOUR_COLLECTION").where("FIELDNAME", "==",  "VALUE").get();
        response.forEach(doc => {
            result.push(doc.data())
          });
        res.end(JSON.stringify(result))
    } catch (error) {
        res.send(error)
    }
})
```
Update a new record:
```javascript
app.post('/update', async (req,res) =>{
    try {
        const response = await db.collection("YOUR_COLLECTION").doc("YOUR_DOCUMENT").set(req.body);
        res.end(JSON.stringify(response))
    } catch (error) {
        res.send(error)
    }
})
```

Delete a new record:
```javascript
app.post('/delete', async (req,res) =>{
    try {
        const response = await db.collection("YOUR_COLLECTION").doc("YOUR_DOCUMENT").delete();
        res.end(JSON.stringify(response))
    } catch (error) {
        res.send(error)
    }
})
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
