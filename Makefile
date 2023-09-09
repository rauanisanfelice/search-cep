-include .env
export $(shell sed 's/=.*//' .env)


format:
	@npm run prettier-format

lint:
	@npm run lint

swagger:
	@npm run swagger-autogen

api:
	@npm run start

packages: node-modules-destroy
	@printf "Destruindo node modules... "
	@npm install
	@echo "OK"

node-modules-destroy:
	@printf "Destruindo node modules... "
	@rm -rfd node_modules
	@echo "OK"


install: packages

copy-dist:
	@echo "Copying dist files... "
	@cp .env.dist .env
	@cp docker-compose.yaml.dist docker-compose.yaml
	@cp docker-compose.yaml.dist docker-compose.dev.yaml
	@echo "OK"

infra-up:
	@docker-compose up -d

infra-up-dev:
	@docker-compose -f docker-compose.dev.yaml up --build

infra-down:
	@docker-compose down

docker-stop:
	@docker-compose stop

clear:
	@printf "Limpando arquivos temporários... "
	@rm -f dist/*.gz
	@rm -rfd *.egg-info
	@rm -f .coverage
	@rm -rf htmlcov/
	@rm -f coverage.xml
	@find . -type f -name '*.log' -delete
