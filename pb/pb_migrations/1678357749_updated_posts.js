migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ig2fzdtg",
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
  collection.schema.removeField("ig2fzdtg")

  return dao.saveCollection(collection)
})
