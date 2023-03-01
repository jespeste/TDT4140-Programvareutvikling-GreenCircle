migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "renqdipn",
    "name": "category",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Småelektrisk",
        "Håndverktøy",
        "Spikerpistol og kompressor",
        "Storelektrisk",
        "Måleverktøy",
        "Lim og festemidler",
        "Maling",
        "Vertøyoppbevaring"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // remove
  collection.schema.removeField("renqdipn")

  return dao.saveCollection(collection)
})
