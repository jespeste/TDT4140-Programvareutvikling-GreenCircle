migrate((db) => {
  const collection = new Collection({
    "id": "08s52gc7pcq24y8",
    "created": "2023-02-17 09:53:37.825Z",
    "updated": "2023-02-17 09:53:37.825Z",
    "name": "annonser",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bzqu4sj2",
        "name": "tittel",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("08s52gc7pcq24y8");

  return dao.deleteCollection(collection);
})
