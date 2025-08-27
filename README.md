# Full Stack Chat Application (React 19 + Node.js/Express/TypeScript)

## Project Overview
This is a full-stack chat application with:
- Frontend: React 19 (TypeScript)
- Backend: Node.js/Express (TypeScript, ESM modules)
- Microservices:
  - API Gateway
  - Auth Service
  - Chat Service
  - Message API (with Redis caching)

## Prerequisites
- Node.js v16 or higher
- npm
- Redis server running on `localhost:6379`
  - Or use Memurai Portable or WSL if on Windows

## Setup Instructions

### 1. Install dependencies

npm install


### 2. Build the backend (TypeScript)

npm run build:backend


### 3. Build the frontend (React)

npm run build


### 4. Start Redis

  Download and extract, then run `memurai.exe` in the extracted folder.


### 5. Start the backend API Gateway

node build/api-gateway/index.js

### 6. Start the chat service (if not started by the gateway)

node build/chat-service/index.js


### 7. Start the frontend (for development)

npm start


## Usage
- Open [http://localhost:3000](http://localhost:3000) in your browser.
- Login with:
  - Username: `sanjay` or `arora`
  - Password: `password123`
- Chat and send messages in real time.

