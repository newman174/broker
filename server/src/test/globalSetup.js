import { execSync } from 'child_process';

// reset test_broker database before any test suites begin
const setup = () => {
  execSync('npm run resetdb:test');
};

export default setup;