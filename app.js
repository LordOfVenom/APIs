let express = require('express');
let app = express();
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 7800;
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let MongoUrl =process.env.MongoURL;
let db;

app.get('/',(req,res)=>{
    res.send('hii from express')
})
//user details
app.get('/Amazon_customer',(req,res)=>{
    db.collection('user').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})


//product details wrt to product category
app.get('/Amazon_product',(req,res)=>{
    let CategoryId = Number(req.query.CategoryId)
    let query={}
    if(CategoryId){
        query= {category_id:CategoryId}
    }else{
        query={}
    }
    db.collection('product').find(query).toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//order Details
app.get('/Amazon_order',(req,res)=>{
    db.collection('order').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//payment Details
app.get('/Amazon_payment',(req,res)=>{
    db.collection('payment').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//Delivery Details

app.get('/Amazon_delivery',(req,res)=>{
    db.collection('deliver').find().toArray((err, result)=>{
        if (err) throw err;
        res.send(result)
    })
})

//connection with db
MongoClient.connect(MongoUrl, (err, client)=>{
  if (err) console.log('error while connection');
  db=client.db('mahesh');
  app.listen(port,()=>{
    console.log(`server ${port}`)
})
})