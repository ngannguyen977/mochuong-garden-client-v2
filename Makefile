

APP_NAME :=iot-observe
VERSION := $(shell git describe --tags --abbrev=0)
DOCKER_USER=eneoti
DOCKER_REPO=754404031763.dkr.ecr.ap-southeast-1.amazonaws.com
HOST=localhost:8080
HELM := $(shell helm ls|grep '$(APP_NAME)')
ifeq ($(VERSION),)
	VERSION:= "v1.0"
endif
# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help


# DOCKER TASKS
# Build the container
build-docker: ## Build the container
	docker build -t $(APP_NAME) .
clear-none:
	docker rmi -f `docker images -a |grep 'none'|awk '{print \$$3}'`

clear:
ifeq ($(HELM),)
	echo 'not exist $(APP_NAME)'
else
	helm delete $(APP_NAME) --purge
endif
	docker rmi -f `docker images -a |grep '$(APP_NAME)'|awk '{print\$$3}'`

clearall:
	docker rmi -f `docker images -a |grep '$(APP_NAME)\|none'|awk '{print\$$3}'`

clean: stop clear

build-nc: ## Build the container without caching
	docker build --no-cache -t $(APP_NAME) .

run: ## Run container

	docker run  \
	--name $(APP_NAME) -p 8080:8080 -d $(APP_NAME)




up: build run ## Run container on
stop: ## Stop and remove a running container
	docker stop $(APP_NAME); docker rm -f $(APP_NAME)

stopall:
	docker rm -f `docker ps -a -q`

release: build-nc publish clear ## Make a release by building and publishing the `{version}` ans `latest` tagged containers to ECR

# Docker publish
publish: login publish-latest publish-version ## Publish the `{version}` ans `latest` tagged containers to ECR

publish-latest: tag-latest ## Publish the `latest` taged container to ECR
	@echo 'publish latest to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(APP_NAME):latest

publish-version: tag-version ## Publish the `{version}` taged container to ECR
	@echo 'publish $(VERSION) to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

# Docker tagging
tag: tag-latest tag-version ## Generate container tags for the `{version}` ans `latest` tags

tag-latest: ## Generate container `{version}` tag
	@echo 'create tag latest'
	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):latest

tag-version: ## Generate container `latest` tag
	@echo 'create tag $(VERSION)'
	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

# login to AWS-ECR
login: ## login dockerhub
	$(shell aws ecr get-login --no-include-email --region ap-southeast-1)

deploy:
	helm install --name $(APP_NAME) deployment --set ENV=production
upgrade-deploy:
	helm upgrade $(APP_NAME) deployment --set ENV=production
undeploy:
	helm delete $(APP_NAME) --purge
port-forward:
	kubectl -n iot port-forward  svc/$(APP_NAME)-production 10090:10090
version: ## Output the current version
	@echo $(VERSION)
commit:
	git add  .
	--git commit -m "$m"
commitnPush: commit
	--git push origin master
ungittag:
	echo $(VERSION)
	--git push --delete origin $(VERSION)
	--git tag --delete $(VERSION)
gittag:
	git tag -a "$(VERSION)" -m "$(VERSION)"
	git push --tags
quicktag: ungittag commit gittag
build-project:
	yarn build
localDeploy: build-project build-docker publish clear deploy