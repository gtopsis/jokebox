[![Deploy static content to Pages](https://github.com/gtopsis/jokebox/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/gtopsis/jokebox/actions/workflows/main.yml)

# JokeBox 

A web application designed to bring entertainment and engagement to users by
allowing them to collect, rate, and enjoy a wide variety of jokes.

## Live Demo ⚡

Visit https://gtopsis.github.io/jokebox/

## Run the project locally

### Serve app for Development

- Using **Docker**

  ```bash
  docker build -t jokebox -f Dockerfile .
  docker run --rm jokebox:latest -p 5173:5173 .
  ```

- Using PNPM (v10.6.1 recommended)
  > **_NOTE:_** Node v20.9.0 is recomended
  ```bash
  pnpm i
  pnpm run dev
  ```
- Using NPM
  > **_NOTE:_** Node v20.9.0 is recomended
  ```bash
  npm i
  npm run dev
  ```

Visit http://localhost:5173/jokebox/

### Run tests
```
npm run test:unit
```

### Preview app

```bash
npm i
npm run build
npm run preview
```

Visit http://localhost:8080/jokebox/

## Notable design decisions ⚖️
- **Responsiveness**: App has been designed to be accessible from users in both mobile and desktop devices
- **Deployment**: App's demo is accessible/approachable to anyone as a result of its deployment to GitHub-pages service.
- **Testing**: Used library testing-library/vue in order to avoid testing implementation details of components, but rather to emphasize/focus on tests that closely resemble how those componets are interacted by the users of JokeBox.
- Respect to browser's theme settings: App has been designed to be accessible regardless users' browser settings (dark/light modes) 
