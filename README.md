<div align="center"><h1>Server Ginga CCWS<br/><sup><sub><sup>Mock ginga web server - ABNT NBR 15606 11</sup></sub></sup></h1></div>

> A mock server for Ginga-based DTVi applications, built to support ABNT NBR 15606-11.
Ideal for testing interactive digital TV applications in a local environment with [Telemedia Ginga](https://github.com/TeleMidia/ginga) or a **desktop browser**.

 * **Default Server URL:** <http://localhost:44642/>
 * **API Documentation:** <https://gly-engine.github.io/site-ginga-ccws>

## :rocket: Quick Start

```
wget https://get.gamely.com.br/ccws
``` 

```
chmod +x ccws
```

```
./ccws
```

## :hammer_and_wrench: Building from Source

* **using bun**

```
bun run build
``` 

* **Using NPM + NodeJS**

```
npm install
```

```
npm run build
```

* **Using Docker + Bun**

```
docker run --rm -v $(pwd):/app -w /app oven/bun bun run build
```

## :gear: Running from source

* **using bun**

```
bun start
``` 

* **Using NPM + NodeJS**

```
npm install
npm start
```

* **Using Docker + Bun**

```
docker run --rm -v $(pwd):/app -w /app oven/bun bun start
```

---
**:warning: Note:** _This application does not handle media playback. It only simulates state transitions. For example, attempting to pause a non-playing stream will result in an error._
