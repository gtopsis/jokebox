# JokeBox

A web application designed to bring entertainment and engagement to users by
allowing them to collect, rate, and enjoy a wide variety of jokes.

## Live Demo

Visit https://gtopsis.github.io/jokebox/

## Locally

### Serve app for Development

```bash
docker build -t jokebox -f Dockerfile .
docker run --rm jokebox:latest -p 5173:5173 .
```

Visit http://localhost:5173/jokebox/


<!-- ### Preview app

```bash
npm i
npm run build
npm run preview
```

Visit http://localhost:8080/jokebox/ -->