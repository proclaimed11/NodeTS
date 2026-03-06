## Initialize node: ##
 Run the command "npm init -y
## Install express: ##
 Run the command "npm i express"
## install node and express types and store them as dev- dependencies:##
 Run the command "npm i --save-dev typescript ts-node @types/node @types/express"
## Install nodemon: ##
 Run the command "npm i nodemon"
## Create a tsconfig.json file: ## 
Run "npx --init tsc"
## Changes in the tsconfig.json: ##
     -"types": ["node","express"],
     -Uncomment the rootdir and       outdir sections
## Changes in the tsconfig.json: ##
       "include":["src/**/*"],
       "exclude":["node_modules","dist"]
## Changes in the package.json ##:
     -"types":"module", // allows import ....
     - "scripts": {
        "dev": "nodemon --watch src --ext ts --exec \"node --loader ts-node/esm ./src/index.ts\"", //allows running npm run dev in the src/index.ts
        "start":"node dist/index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
        },
## Create a src folder and inside it create a index.ts folder ##
Run "echo "console.log('Hello, Node.js with Typescript!');"> src/index.ts"

## NB: if you get at encoded error just below vscode change the encoding to Utf-8 ##
[utf-8/encoding type area at the bottom] >> save with encoding >> choose utf-8
     