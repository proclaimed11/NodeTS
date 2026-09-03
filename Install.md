## Initialize node: ##
 Run the command "npm init -y
## Install express: ##
 Run the command "npm i express"
## install node and express types and store them as dev- dependencies:##
 Run the command "npm i --save-dev typescript ts-node @types/node @types/express" and "npm i -D tsx"
## Install nodemon: ##
 Run the command "npm i nodemon"
## Create a tsconfig.json file: ## 
Run "npx tsc --init"
## Changes in the tsconfig.json: ##
     -"types": ["node","express"],
     -Uncomment the rootdir and outdir sections
## Changes in the tsconfig.json: ##
       "include":["src/**/*"],
       "exclude":["node_modules","dist"]
## Changes in the package.json ##:
     -"types":"module", // allows import ....
     - "scripts": {
        "dev": "nodemon --watch src --ext ts --exec \"tsx ./src/index.ts\"", //allows running npm run dev in the src/index.ts
        "start":"node dist/index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
        },
## Create a src folder and inside it create a index.ts folder ##
Run "echo "console.log('Hello, Node.js with Typescript!');"> src/index.ts"

## NB: if you get at encoded error just below vscode change the encoding to Utf-8 ##
[utf-8/encoding type area at the bottom] >> save with encoding >> choose utf-8

================= DATABASE CONNECTION ====================================

## install the pg(postgresql) and dotenv(.env) packages  and its typescript types ##
Run "npm i pg dotenv" also "npm i -D tsx" then "npm i --save-dev @types/pg"

# to connect to the database use the following Url sample #
~ postgresql://[username]:[password]@[host]:[port]/[database_name]
     
# At env the important parameters to have are
#JWT
JWT_SECRET = nabokiLASCAP1998
JWT_EXPIRES_IN = 1hr
REFRESH_TOKEN_SECRET = nabokiLASCAP1998


=============== DATABASE IMPORTNT TABLES ====================
# Database creating command
CREATE DATABASE [database name]

GRANT ALL PRIVILEGES ON DATABASE [database name] TO [user name]

Create a users table
     "CREATE TABLE users(
     service_db(# id BIGSERIAL PRIMARY KEY,
     service_db(# first_name VARCHAR(60) NOT NULL,
     service_db(# mid_name VARCHAR(60) NOT NULL,
     service_db(# last_name VARCHAR(60) NOT NULL,
     service_db(# email VARCHAR(255) UNIQUE NOT NULL,
     service_db(# phone_no VARCHAR(60) NOT NULL,
     service_db(# location VARCHAR(255) NOT NULL,
     service_db(# role VARCHAR(30) DEFAULT 'user' NOT NULL,
     service_db(# created_at TIMESTAMPTZ DEFAULT NOW()
     ,
     service_db(# updated_at TIMESTAMPTZ DEFAULT NOW());"

Create user_credentials table
     CREATE TABLE user_credentials (
     user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     password_hash TEXT NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
     );

create a refresh_tokens table
     CREATE TABLE refresh_token(
     service_db(# user_id BIGINT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     service_db(# token TEXT,
     service_db(# expires_at TIMESTAMPTZ NOT NULL);


