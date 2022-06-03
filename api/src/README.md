# Sabre Spot-The-Dot Api

Requires a PostgreSQL instance to be running locally with the database name "spot-the-dot". Can be changed in .env-cmdrc.json.

After every clone or fetch, make sure to run `npm run migrate:rball` to rollback any migrations if they have been changed.

Then run `rpm run migrate:latest` to build the schema locally. Launch with `npm run start`, log out of the ui if you are logged in, and log in again to add an entry to the `User` table. To fill with seed data, run `npm run knex:seed`. Seed data will not work without an entry in the `User` table.
