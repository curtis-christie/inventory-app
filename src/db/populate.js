#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR ( 255 ),
  user_name VARCHAR ( 255 ),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, user_name, created_at) 
VALUES
  ('Hello There!', 'Amando', NOW()),
  ('Hi there!', 'Charles', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://postgres:asdf@localhost:5432/messages",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
