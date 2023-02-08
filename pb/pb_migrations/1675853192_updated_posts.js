migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2ycomf1844krs5")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2ycomf1844krs5")

  collection.listRule = null

  return dao.saveCollection(collection)
})
