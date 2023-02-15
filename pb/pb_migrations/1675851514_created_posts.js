migrate((db) => {
  const collection = new Collection({
    "id": "o2ycomf1844krs5",
    "created": "2023-02-08 10:18:34.646Z",
    "updated": "2023-02-08 10:18:34.646Z",
    "name": "posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zecpfg0d",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o2ycomf1844krs5");

  return dao.deleteCollection(collection);
})
