migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2ycomf1844krs5")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("o2ycomf1844krs5")

  collection.viewRule = null

  return dao.saveCollection(collection)
})
