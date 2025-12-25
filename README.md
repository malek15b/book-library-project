# BookLibrary

**BookLibrary** is a web application for managing books, genres, and members with an integrated borrowing feature.  
Books can be added automatically via ISBN lookup or manually managed.  
Future improvements include user roles, Multiple language support, import/export functionality, and customizable fields to make the app even more flexible and powerful.

This is a capstone project that is part of the Java Development Bootcamp at neuefische GmbH.

---

## Features

- **Book, Genre and Member Management** – Add, edit, and delete books
- **ISBN Lookup** – Automatically fill in book data using an external API
- **Borrowing System** – Track book loans and returns

---

## Planned Features

- User roles and permissions
- Multiple language support
- CSV import and export
- Custom fields for individual customization

---

## Tech Stack

- **Frontend:** React, Vite, TypeScript, TailwindCSS
- **Backend:** Java, Spring Boot, Spring Security, REST API
- **Database:** MongoDB

---

## Installation

```bash
# Clone the repository
git clone https://github.com/malek15b/book-library-project.git
cd book-library-project

# docker build
docker build -t <your-image>:latest .

# docker run
docker run -d -p 8080:8080 \
  --name <container-name> \
  -e GITHUB_ID=<your-github-id> \
  -e GITHUB_SECRET=<your-github-secret> \
  -e HOST_FRONTEND=/ \
  -e MONGO_DB_URI=<your-mongo-db-uri> \
  <your-image>:latest
```

## Access the application
Open your browser and visit: http://localhost:8080
