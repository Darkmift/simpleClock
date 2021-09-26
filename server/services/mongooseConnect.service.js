const mongoose = require('mongoose')

const MONGO_CONNECTION_URI = process.env.MONGO_CONNECTION_URI
const CONNECT_OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect(MONGO_CONNECTION_URI, CONNECT_OPTS).then(data => {
  console.log("Connected to MongoDB");
  const connection = data.connections[0]
  const { readyState, name, db, collections } = connection
  const collectionsArr = []

  for (const key in collections) {
    collectionsArr.push(collections[key])
  }
  const collectionData = collectionsArr.map(c => ({ name: c.name, modelName: c.modelName, collectionName: c.collectionName }))
  console.log({ readyState, name, db: db.s.namespace, collections: collectionData });
  return data
})
  .catch(err => {
    console.error(err);
    throw new Error('database failed to connect')
  })


