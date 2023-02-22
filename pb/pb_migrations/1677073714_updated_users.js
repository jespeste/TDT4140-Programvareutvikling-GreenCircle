migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("users_avatar")

  // remove
  collection.schema.removeField("ydzketl2")

  // remove
  collection.schema.removeField("syctbgze")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yqvaknuu",
    "name": "avatar",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "users_avatar",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/gif",
        "image/webp"
      ],
      "thumbs": null
    }
  }))

  // add
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

  // remove
  collection.schema.removeField("yqvaknuu")

  return dao.saveCollection(collection)
})
