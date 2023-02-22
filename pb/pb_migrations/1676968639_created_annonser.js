migrate((db) => {
  const collection = new Collection({
    "id": "86dpj8jcw4fi3af",
    "created": "2023-02-21 08:37:19.204Z",
    "updated": "2023-02-21 08:37:19.204Z",
    "name": "annonser",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "f3ricuf9",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "d0fqiw0f",
        "name": "location",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ispwlfdw",
        "name": "description",
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
  const collection = dao.findCollectionByNameOrId("86dpj8jcw4fi3af");

  return dao.deleteCollection(collection);
})
