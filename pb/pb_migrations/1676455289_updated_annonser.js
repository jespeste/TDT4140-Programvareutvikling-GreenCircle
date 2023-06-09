migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehxjgvqc",
    "name": "owner",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "id",
        "username"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ehxjgvqc",
    "name": "owner",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
