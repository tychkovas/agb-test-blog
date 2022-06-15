install:
	npm install

lint:
	npx eslint .

start: 
	npm run start

trace: 
	npm run trace

db_postgres:
	# NODE_ENV=postgres npx sequelize-cli db:migrate
	NODE_ENV=postgres npx sequelize-cli db:seed:all
