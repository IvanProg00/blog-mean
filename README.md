# Blog MEAN

## Run Project

### Installation

- [Docker](https://www.docker.com/get-started)

### Run commands on terminal

#### On Mac/Linux

```bash
# Production
make
# or
make prod

# Development
made dev
```

#### On Windows

```bash
# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```
