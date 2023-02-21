migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("08s52gc7pcq24y8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4dtevo5q",
    "name": "description",
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
  const collection = dao.findCollectionByNameOrId("08s52gc7pcq24y8")

  // remove
  collection.schema.removeField("4dtevo5q")

  return dao.saveCollection(collection)
})
