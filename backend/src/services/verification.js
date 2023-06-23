/*
a module which is called with two contracts, runs swagger-mock-validator on them, and returns the result

verify(pact, OAS)
  if verification passes -> { pass: true }
  if verification fails -> { pass: false, // the entire stdout for now}
*/

import { exec } from 'child_process';
import path from 'node:path';

const pactPath = path.resolve(process.cwd(), 'src/services/sample_pact.json');
const OASPath = path.resolve(process.cwd(), 'src/services/sample_OAS.json');

function verify() {
  const initCommand = `npx swagger-mock-validator ${OASPath} ${pactPath}`;

  return new Promise((resolve, reject) => {
    exec(initCommand, (err, stdout, stderr) => {
      // THIS NEEDS TO BE TESTED ONCE WE HAVE AN ERROR HANDLING MIDDLEWHERE. SHOULD RESPOND WITH 500
      if (stderr) {
        reject(new Error('Failed to execute swagger-mock-validator'));
      }

      if (!err) {
        resolve({pass: true});
      }
  
      const verificationResult = {
        pass: false,
        stdout,
      };

      reject(verificationResult);
    });
  });
}

verify();
