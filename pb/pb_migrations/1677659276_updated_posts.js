migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7dkhgygf",
    "name": "is_listing",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // remove
  collection.schema.removeField("7dkhgygf")

  return dao.saveCollection(collection)
})
