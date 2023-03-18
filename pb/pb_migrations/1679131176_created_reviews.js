migrate((db) => {
  const collection = new Collection({
    "id": "o5m1oxfk3ryvsc2",
    "created": "2023-03-18 09:19:36.549Z",
    "updated": "2023-03-18 09:19:36.549Z",
    "name": "reviews",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3tyoxrhh",
        "name": "rating",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 5
        }
      },
      {
        "system": false,
        "id": "5wzhdohk",
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
        "id": "wcknsnns",
        "name": "reviewer",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "7fegqo7w",
        "name": "reviewedUser",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "maxSelect": 1,
          "displayFields": [
            "email"
          ]
        }
      },
      {
        "system": false,
        "id": "qwkbc4pm",
        "name": "reviewedPost",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "u2ous92rf552d31",
          "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("o5m1oxfk3ryvsc2");

  return dao.deleteCollection(collection);
})
