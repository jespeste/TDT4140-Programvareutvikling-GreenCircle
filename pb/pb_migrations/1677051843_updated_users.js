migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydzketl2",
    "name": "posts",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "u2ous92rf552d31",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "syctbgze",
    "name": "favourites",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "u2ous92rf552d31",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("ydzketl2")

  // remove
  collection.schema.removeField("syctbgze")

  return dao.saveCollection(collection)
})
