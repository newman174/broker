CREATE TABLE participants (
  participant_id serial PRIMARY KEY,
  participant_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE integrations (
  integration_id serial PRIMARY KEY,
  consumer_id INT,
  provider_id INT,
  FOREIGN KEY (consumer_id) REFERENCES participants(participant_id),
  FOREIGN KEY (provider_id) REFERENCES participants(participant_id)
);

CREATE TABLE contracts (
  contract_id serial PRIMARY KEY,
  participant_id INT NOT NULL,
  contract json NOT NULL,
  contract_type VARCHAR(20) NOT NULL,
  publish_date TIMESTAMP NOT NULL DEFAULT now(),
  FOREIGN KEY (participant_id) REFERENCES participants(participant_id)
);

CREATE TABLE participant_versions (
  participant_version_id serial PRIMARY KEY,
  contract_id INT NOT NULL,
  branch_name VARCHAR(255),
  FOREIGN KEY (contract_id) REFERENCES contracts(contract_id)
);

CREATE TABLE comparisons (
  comparison_id serial PRIMARY KEY,
  integration_id INT NOT NULL,
  consumer_contract_id INT,
  provider_contract_id INT,
  comparison_status VARCHAR(20) NOT NULL,
  comparison_date TIMESTAMP NOT NULL DEFAULT now(),
  FOREIGN KEY (integration_id) REFERENCES integrations(integration_id),
  FOREIGN KEY (consumer_contract_id) REFERENCES contracts(contract_id),
  FOREIGN KEY (provider_contract_id) REFERENCES contracts(contract_id)
);