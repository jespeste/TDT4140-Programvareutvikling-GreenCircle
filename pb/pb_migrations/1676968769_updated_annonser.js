migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("86dpj8jcw4fi3af")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7z6mzzsk",
    "name": "owner",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("86dpj8jcw4fi3af")

  // remove
  collection.schema.removeField("7z6mzzsk")

  return dao.saveCollection(collection)
})
