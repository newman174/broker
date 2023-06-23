export default {
  "openapi":"3.0.2",
  "info": {
    "title": "user_service_api",
    "version": "1"
  },
  "servers": [
    {"url":"https://api.server.test/v1"}
  ],
  "paths": {
    "/": {
      "get": {
        "responses": {
          "200": {
            "description": "Successful request",
            "content": {
              "text/html; charset=utf-8": {
                "schema": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    },
    "/users/{id}": {
      "get": {
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            },
            "example": 1
          }
        ],
        "responses": {
          "200": {
            "description": "Successful request",
            "content": {
              "application/json; charset=utf-8": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "userId": {
                      "type": "integer"
                    },
                    "username": {
                      "type": "string"
                    },
                    "touchedBy": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};