migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // remove
  collection.schema.removeField("uv19iye4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "96wtryco",
    "name": "picture",
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
  const collection = dao.findCollectionByNameOrId("u2ous92rf552d31")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uv19iye4",
    "name": "picture",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "application/pdf",
        "image/jpeg"
      ],
      "thumbs": []
    }
  }))

  // remove
  collection.schema.removeField("96wtryco")

  return dao.saveCollection(collection)
})
