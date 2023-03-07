migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j4mug7g2",
    "name": "posts",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "u2ous92rf552d31",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mahyn3xw",
    "name": "favourites",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "u2ous92rf552d31",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("j4mug7g2")

  // remove
  collection.schema.removeField("mahyn3xw")

  return dao.saveCollection(collection)
})
