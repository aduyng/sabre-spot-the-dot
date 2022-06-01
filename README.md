# Sabre BlitzCode: spot-the-dot

## Set Up

### Installation steps
1. check out this code
    ```bash
    git clone git@github.com:aduyng/sabre-spot-the-dot.git
    ```
2. go inside of spot-the-dot folder
    ```bash
    cd spot-the-dot
    ```
3. install dependencies:
   ```bash
   npm install
   ```
4. install dependencies:
    ```bash
   npm install
   npm --prefix api install
   npm --prefix functions install
   npm --prefix web install
    ```
   The above command will install dependencies for `api`, `web`, and `functions` modules 
5. create the following in `postgresql`: 
    * user `postgres` 
    * password: the postgres default password - `admin` or `postgres`
    * database name: `spot-the-dot`
    the commands are: 
    ```
    CREATE DATABASE "spot-the-dot";
    ```
6. initialize the database
    Inside folder `api`, run the following command
    ```bash
    npm run knex -- migrate:latest
    ```
7. Start the backend (inside `api` folder)
   Create `./env-cmdrc.local.json` and put your own overrides configuration parameters there
    ```bash
    npm run start:env
   ```
   or 
   ```bash
   node src/init.js --env=development
   ```
8. Start the frontend (inside `web` folder)
    ```bash
   npm start
    ```
9. access the application at http://localhost:5000/

### Frequently Asked Questions

1. How do I grant all privileges on all tables? 

   ```
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO spot-the-dot;
   GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO spot-the-dot;
   ```

2. How do I run a CLI task?
   ![Run cron task on Webstorm](docs/images/run_cron_task.png "Run cron task on Webstorm")
   Or from the console:
   ```shell
   node src/cli/init --script=<theScriptFileName>
   ```
