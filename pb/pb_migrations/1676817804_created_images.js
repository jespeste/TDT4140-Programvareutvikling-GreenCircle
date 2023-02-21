migrate((db) => {
  const collection = new Collection({
    "id": "onvxaax9mjl8g7m",
    "created": "2023-02-19 14:43:24.703Z",
    "updated": "2023-02-19 14:43:24.703Z",
    "name": "images",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rhnzslao",
        "name": "image",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "application/pdf",
            "image/png",
            "image/vnd.mozilla.apng",
            "image/jpeg"
          ],
          "thumbs": []
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
  const collection = dao.findCollectionByNameOrId("onvxaax9mjl8g7m");

  return dao.deleteCollection(collection);
})
