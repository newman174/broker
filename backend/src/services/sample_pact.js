export default {
  "consumer": {
    "name": "service_1"
  },
  "interactions": [
    {
      "description": "a request for the user with a userId of 1",
      "providerStates": [
        {
          "name": "a user with userId = 1 exists"
        }
      ],
      "request": {
        "headers": {
          "Accept": "application/json"
        },
        "method": "GET",
        "path": "/users/1"
      },
      "response": {
        "body": {
          "touchedBy": [
            "user_service"
          ],
          "userId": 1,
          "username": "mimmy"
        },
        "headers": {
          "Content-Type": "application/json"
        },
        "matchingRules": {
          "body": {
            "$": {
              "combine": "AND",
              "matchers": [
                {
                  "match": "type"
                }
              ]
            }
          },
          "header": {}
        },
        "status": 200
      }
    }
  ],
  "metadata": {
    "pact-js": {
      "version": "11.0.2"
    },
    "pactRust": {
      "ffi": "0.4.0",
      "models": "1.0.4"
    },
    "pactSpecification": {
      "version": "3.0.0"
    }
  },
  "provider": {
    "name": "user_service"
  }
};