migrate((db) => {
  const collection = new Collection({
    "id": "i4murrc5e54r2oe",
    "created": "2023-03-08 18:27:29.974Z",
    "updated": "2023-03-08 18:27:29.974Z",
    "name": "reports",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dlsyf19z",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 0,
          "max": 256,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "zc70avao",
        "name": "reporter",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "qeffbkoy",
        "name": "reportedUser",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "9bclfwri",
        "name": "reportedPost",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "u2ous92rf552d31",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": [
            "title"
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
  const collection = dao.findCollectionByNameOrId("i4murrc5e54r2oe");

  return dao.deleteCollection(collection);
})
