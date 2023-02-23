migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ntieiylnsgmw2q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k9m1qpk0",
    "name": "name",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ntieiylnsgmw2q")

  // remove
  collection.schema.removeField("k9m1qpk0")

  return dao.saveCollection(collection)
})
