BASE_IMAGE := node:25-alpine
PROD_IMAGE := pokedex:latest

.PHONY: shell run test test-coverage docs build run-prod

shell:
	docker run -it --rm -v $(PWD):/app -w /app $(BASE_IMAGE) /bin/sh

run:
	docker run --rm -p 3000:3000 -v $(PWD):/app -w /app $(BASE_IMAGE) sh -c "npm install && npm run dev"

test:
	docker run --rm -v $(PWD):/app -w /app $(BASE_IMAGE) npm run test

test-coverage:
	docker run --rm -v $(PWD):/app -w /app $(BASE_IMAGE) npm run test:coverage

docs:
	docker run --rm -v $(PWD):/app -w /app $(BASE_IMAGE) npm run docs

build:
	docker build -t $(PROD_IMAGE) -f .docker/Dockerfile --progress plain .

run-prod: build
	docker run --rm -p 3000:3000 $(PROD_IMAGE)
