import { execSync } from 'child_process';

// reset test_broker database after ALL test suites have completed
const teardown = () => {
  execSync('npm run resetdb:test');
};

export default teardown;