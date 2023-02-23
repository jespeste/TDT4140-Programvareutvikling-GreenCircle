migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ntieiylnsgmw2q")

  // remove
  collection.schema.removeField("a2q7udzv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xp8v7aiw",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0ntieiylnsgmw2q")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a2q7udzv",
    "name": "url",
    "type": "url",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // remove
  collection.schema.removeField("xp8v7aiw")

  return dao.saveCollection(collection)
})
