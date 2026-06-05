# BILDER API
<a name="readme-top"></a>

<div align="center">
  <img src="./public/rada-logo.svg" alt="logo" width=150>
  <h1>BILDER</h1>
</div> <br>

<details open>
<summary>Table of Contents</summary>
<ol>
  <li>
    <a href="#introduction">Introduction</a>
    <ul>
      <li>
        <a href="#client">Client</a>
      </li>
    </ul>
  </li>
  <li>
    <a href="#features">Features</a>
    <ul>
      <li>
        <a href="#built-with">Built With</a>
      </li>
    </ul>
  </li>
  <li><a href="#endpoints">Endpoints</a></li>
  <li><a href="#getting-started">Getting Started</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ol>
</details>

## Introduction
BILDER API powers the backend for the platform. It handles authentication, authorization, blog management, comments, claps, and database operations.

This repository contains the server-side application.

### Client 
- Client Repository: https://github.com/Dewiin/wimmelbilder

## Features
- 🎮 Game Session Management
    - Create and track individual game sessions.
    - Resume active sessions after page refreshes.
    - Record session start and completion timestamps.
- 🎯 Character Validation Engine
    - Validate character selections using server-side coordinate checks.
    - Prevent client-side manipulation of character locations.
    - Support responsive gameplay through normalized coordinate matching.
- 🔄 Progress Tracking
    - Persist found characters throughout a game session.
    - Prevent duplicate character submissions.
    - Track player progress toward session completion.
- 🏆 Scoring System
    - Calculate completion times automatically.
    - Generate scores when a session is completed.
    - Store results for leaderboard integration.

### Built With
[![Node][Node]][Node-url]
[![Express][Express]][Express-url]
[![PostgreSQL][PostgreSQL]][PostgreSQL-url]
[![Prisma][Prisma]][Prisma-url]

## Endpoints

### Game
| Endpoint                       | Method | Description                       |
| ------------------------------ | ------ | --------------------------------- |
| /api/game/                     | GET    | Retrieve all game maps            |
| /api/game/:mapName             | GET    | Retrieve a map by name            |
| /api/game/:mapName             | POST   | Post a character submission       |
| /api/game/:mapName/score       | POST   | Submit score to map's leaderboard |
| /api/game/:mapName/leaderboard | GET    | Retrieve map's leaderboard        |

### Session
| Endpoint                         | Method | Description                        |
| -------------------------------- | ------ | ---------------------------------- |
| /api/game/session/start          | GET    | Create a new game session          |
| /api/game/session/:sessionId/end | POST   | End an existing game session by id |
| /api/game/session/:sessionId     | GET    | Retrieve a game session            |

## Getting Started

### Installation
```sh 
npm install
```

### Environment Variables
```sh
DATABASE_URL="your_database_url"
```

### Prisma setup
```sh
# Generate client and apply migrations
npx prisma migrate dev

# Open studio (optional)
npx prisma studio

# Seeding an author account (optional)
npx prisma db seed
```

### Running the server
```sh
npm run dev
```

## Contributing

Any kinds of contribution is welcome, such as:

- New features
- Bug fixes
- Typo fixes
- Suggestions
- Maintenance
- Documents
- etc.

#### Heres how you can contribute:

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

<p align="right"><a href="#readme-top">Back to top</a></p>

## License

MIT License

Copyright (c) 2026 Devin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[Node]: https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en

[Express]: https://img.shields.io/badge/Express.js-404d59.svg?style=for-the-badge&logo=express&logoColor=61DAFB
[Express-url]: https://expressjs.com/

[PostgreSQL]: https://img.shields.io/badge/Postgres-316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

[Prisma]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/docs 