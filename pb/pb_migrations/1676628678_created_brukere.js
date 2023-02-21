migrate((db) => {
  const collection = new Collection({
    "id": "vl6xiay1gbgn8f2",
    "created": "2023-02-17 10:11:18.130Z",
    "updated": "2023-02-17 10:11:18.130Z",
    "name": "brukere",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gaipbpid",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "copx22th",
        "name": "location",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "q0idsc2h",
        "name": "field",
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
  const collection = dao.findCollectionByNameOrId("vl6xiay1gbgn8f2");

  return dao.deleteCollection(collection);
})
