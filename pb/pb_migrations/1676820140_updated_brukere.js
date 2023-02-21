migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6xiay1gbgn8f2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qprycqb4",
    "name": "telephone",
    "type": "number",
    "required": false,
    "unique": true,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6xiay1gbgn8f2")

  // remove
  collection.schema.removeField("qprycqb4")

  return dao.saveCollection(collection)
})
