import express from 'express';
import dotenv from 'dotenv';

import {MongoClient} from 'mongodb';
import bodyparser from 'body-parser';
import cors from 'cors'



dotenv.config() // or as an es module: 


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'NewPass';

const app = express() // remove this after you've confirmed it is working 
const port = 3000
app.use(bodyparser.json())
app.use(cors())

await client.connect()
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password)
  res.send({ success: true, result: findResult })
})
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName); const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password)
  res.send({ success: true, result: findResult })
})
app.listen(port, () => { 
  console.log(`Example app listening on port http://localhost:${port}`) 
})