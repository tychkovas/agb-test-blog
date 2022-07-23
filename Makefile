setup: prepare install db-migrate

prepare:
	cp -n .env.example .env || true

install:
	npm install

db-migrate:
	npx sequelize-cli db:migrate

db_postgres:
	# NODE_ENV=postgres npx sequelize-cli db:migrate
	NODE_ENV=postgres npx sequelize-cli db:seed:all

lint:
	npx eslint .

start:
	heroku local -f Procfile.dev

start-backend:
	npx --exec nodemon --no-warnings server/bin/server.js

trace: 
	npm run trace

test:
	npm test -s

test-coverage:
	npx jest --coverage --runInBand

