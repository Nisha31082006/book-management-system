# Book Management System (React + Vite)

A simple, beginner-friendly Book Management System built with **ReactJS**, **JSX**,
functional components, `useState()`, `useEffect()`, props and conditional rendering.
No backend or database is used - the book list lives in React state.

## Features

- Parent component `BookManagement` and reusable child component `BookCard` (props)
- Welcome message shown with `useEffect()` when the page loads
- Conditional rendering: "Books Available" / "No Books Available"
- Notification with the current book count, updated with `useEffect()` and `[books.length]`
- Add Book form with validation and error messages
- Delete button on every book card
- Clear All Books button (shows the empty-list condition)
- Clean, responsive layout (works on phones and desktops)

## Requirements

- [Node.js](https://nodejs.org/) version 18 or newer (the LTS version is recommended)
- Check your version in a terminal: `node -v`

## How to Run (Windows)

1. Extract the ZIP file.
2. Open the extracted `book-management-system` folder in **VS Code**
   (File > Open Folder).
3. Open the VS Code terminal (Terminal > New Terminal) - Command Prompt or PowerShell both work.
4. Run these commands one by one:

```bash
npm install
npm run dev
```

5. Open the address shown in the terminal in your browser, usually:

```
http://localhost:5173
```

To stop the server, press `Ctrl + C` in the terminal.

Other commands:

```bash
npm run build     # create a production build in the dist folder
npm run preview   # preview the production build
```

### Troubleshooting

- **"npm is not recognized"**: install Node.js from https://nodejs.org and restart VS Code.
- **PowerShell says "running scripts is disabled"**: switch the VS Code terminal to
  **Command Prompt**, or run this once in PowerShell:
  `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
- **Port 5173 already in use**: Vite automatically picks the next free port; use the
  address printed in the terminal.

## Project Structure

```
book-management-system/
├── index.html                      # HTML page with the <div id="root">
├── package.json                    # dependencies and scripts
├── vite.config.js                  # Vite + React plugin configuration
├── README.md
└── src/
    ├── main.jsx                    # entry point, renders <App />
    ├── App.jsx                     # root component
    ├── index.css                   # all styles
    └── components/
        ├── BookManagement.jsx      # PARENT component (state, effects, form, list)
        └── BookCard.jsx            # CHILD component (shows one book via props)
```

## How the Assignment Requirements Are Implemented

### (a) Parent and Child Components with JSX and Props
- `BookManagement.jsx` is the parent. It keeps the book list in state and loops over it
  with `books.map(...)`.
- For each book it renders `<BookCard title={book.title} author={book.author} ... />`.
- `BookCard.jsx` receives `title` and `author` as props and displays them with
  `{title}` and `{author}` in JSX.

### (b) Welcome Message Using useEffect()
- In `BookManagement.jsx`, `useEffect(() => { setWelcomeMessage('Welcome to the Book Management System') }, [])`.
- The empty dependency array `[]` makes it run **once**, when the page loads.
- The message is displayed in the header.

### (c) Conditional Rendering
- `books.length > 0 ? <h2>Books Available</h2> : <h2>No Books Available</h2>`
  (a JSX ternary expression).
- Use **Clear All Books** (or delete every book) to see "No Books Available".

### (d) Notifications Using useEffect()
- A second `useEffect` builds the message "Notification: You now have N books in your list."
- Its dependency array is `[books.length]`, so it runs on page load and again **only** when
  the number of books changes (add, delete, clear all).
- It does not run while typing in the form, so there are no unnecessary notifications.
