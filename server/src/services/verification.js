/*
a module which exposes a `verify` method.

`verify` is called with two contracts as JS objects, runs swagger-mock-validator on them, 
  and returns a promise which resolves or rejects to the result

verify(pact, OAS)
  if verification passes -> resolve { pass: true }
  if verification fails -> reject { pass: false, // the entire stdout for now}
*/

import fs from "node:fs";
import path from "node:path";
import { exec } from "child_process";

import { SwaggerMockValidatorFactory } from "../../node_modules/swagger-mock-validator/dist/swagger-mock-validator-factory.js";

// contracts for development only. DELETE THIS WHEN verify() is called externally
import samplePact from "./sample_pact.js";
import sampleOAS from "./sample_OAS.js";

class Verifier {
  // takes both contracts as plain JS objects
  verify(pact, openAPISpec) {
    const [pactPath, OASPath] = this.createFiles(pact, openAPISpec);
    const initCommand = `npx swagger-mock-validator ${OASPath} ${pactPath}`;

    return new Promise((resolve, reject) => {
      exec(initCommand, (err, stdout, stderr) => {
        this.cleanUpFiles(pactPath, OASPath);

        // THIS NEEDS TO BE TESTED ONCE WE HAVE AN ERROR HANDLING MIDDLEWHERE. SHOULD RESPOND WITH 500
        if (stderr) {
          reject(new Error("Failed to execute swagger-mock-validator"));
        }

        if (!err) {
          resolve({ pass: true });
        }

        const verificationResult = {
          pass: false,
          stdout,
        };

        reject(verificationResult);
      });
    });
  }

  async verify2(pact, openAPISpec) {
    const [pactPath, OASPath] = this.createFiles(pact, openAPISpec);

    const swaggerMockValidator = SwaggerMockValidatorFactory.create();

    const result = await swaggerMockValidator.validate({
      mockPathOrUrl: pactPath,
      specPathOrUrl: OASPath,
    });

    return [result.errors[0].mockDetails, result.errors[0].specDetails];
  }

  createFiles(pact, openAPISpec) {
    const pactPath = path.resolve(
      process.cwd(),
      "src/services/verification_pact.json"
    );
    const OASPath = path.resolve(
      process.cwd(),
      "src/services/verification_OAS.json"
    );

    const pactStream = fs.createWriteStream(pactPath);
    pactStream.write(JSON.stringify(pact));
    pactStream.end();

    const specStream = fs.createWriteStream(OASPath);
    specStream.write(JSON.stringify(openAPISpec));
    specStream.end();

    return [pactPath, OASPath];
  }

  cleanUpFiles(pactPath, OASPath) {
    function onError(err) {
      if (err) {
        console.log("Failed to cleanup a file. Error: ", err);
      }
    }

    fs.unlink(pactPath, onError);
    fs.unlink(OASPath, onError);
  }
}

// TESTING IN DEVELOPMENT ONLY - run `node verification.js`
/*new Verifier()
  .verify(samplePact, sampleOAS)
  .then((result) => console.log(result))
  .catch((reason) => console.log(reason));*/

new Verifier()
  .verify2(samplePact, sampleOAS)
  .then((result) => console.log(result))
  .catch((reason) => console.log(reason));
