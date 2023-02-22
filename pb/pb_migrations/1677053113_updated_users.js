migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ydzketl2",
    "name": "postings",
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

  // update
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

  return dao.saveCollection(collection)
})
