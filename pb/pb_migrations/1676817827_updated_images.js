migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("onvxaax9mjl8g7m")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p6us5oay",
    "name": "title",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("onvxaax9mjl8g7m")

  // remove
  collection.schema.removeField("p6us5oay")

  return dao.saveCollection(collection)
})
