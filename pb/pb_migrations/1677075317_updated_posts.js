migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kof8ioah",
    "name": "location",
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
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // remove
  collection.schema.removeField("kof8ioah")

  return dao.saveCollection(collection)
})
