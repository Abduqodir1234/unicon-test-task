## Run docker in project directory

```bash
 # to run docker compose
 docker compose -f ./docker-compose.yml up
 # to stop docker
 docker compose -f ./docker-compose.yml down
```

## Configure env.

```bash
 # Copy envs from env.example and create .env file
```

## Install dependencies 

```bash
 npm install
```

## Sync schema with DB and seed DB

```bash
# to sync schemas with db
npm run db:sync

# to seed DB
npm run db:seed
```

## Run project

```bash
 # Run project in dev mode
 npm run dev

 # To build project
 tsc

 # Run project in prod mode
 # Before running in prod mode, Build project.
 npm run start
```
## API Documentation

#### Install thunder client plugin in vscode and configure settings for loading datas from thunder-tests folder and it is done. You could see all API documentations in Thunder Client Sections.