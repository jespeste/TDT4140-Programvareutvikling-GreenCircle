migrate((db) => {
  const collection = new Collection({
    "id": "0ntieiylnsgmw2q",
    "created": "2023-02-22 12:49:37.846Z",
    "updated": "2023-02-22 12:49:37.846Z",
    "name": "images",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("0ntieiylnsgmw2q");

  return dao.deleteCollection(collection);
})
