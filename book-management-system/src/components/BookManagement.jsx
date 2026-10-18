import { useState, useEffect } from 'react'
import BookCard from './BookCard.jsx'

// A few starting books so the page is not empty when it first loads.
const INITIAL_BOOKS = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 2, title: 'Wings of Fire', author: 'A. P. J. Abdul Kalam' },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin' },
]

// ---------------------------------------------------------------
// BookManagement  (PARENT COMPONENT)   -> Requirement A
// ---------------------------------------------------------------
// This component owns all the data (the book list) and passes the
// title and author of each book down to <BookCard /> using props.
function BookManagement() {
  // useState() stores data that can change. When a state value changes,
  // React automatically re-renders the component with the new value.
  const [books, setBooks] = useState(INITIAL_BOOKS) // the list of books
  const [title, setTitle] = useState('')            // form input: title
  const [author, setAuthor] = useState('')          // form input: author
  const [error, setError] = useState('')            // form validation error
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [notification, setNotification] = useState('')

  // -------------------------------------------------------------
  // REQUIREMENT B: Welcome message using useEffect()
  // -------------------------------------------------------------
  // useEffect runs code AFTER the component appears on the screen.
  // The empty dependency array [] means: "run only once, when the
  // page loads" - exactly what we need for a welcome message.
  useEffect(() => {
    setWelcomeMessage('Welcome to the Book Management System')
  }, [])

  // -------------------------------------------------------------
  // REQUIREMENT D: Notification using useEffect()
  // -------------------------------------------------------------
  // The dependency array [books.length] tells React to run this effect:
  //   1) once when the page loads, and
  //   2) again ONLY when the NUMBER of books changes.
  // It does not run when the user types in the form fields, so there are
  // no unnecessary notifications. We depend on books.length (a number)
  // instead of the whole books array, so the effect fires only on a real
  // change in the count.
  useEffect(() => {
    const count = books.length
    const word = count === 1 ? 'book' : 'books'
    setNotification(`Notification: You now have ${count} ${word} in your list.`)
  }, [books.length])

  // Add a new book (called when the form is submitted)
  function handleAddBook(event) {
    event.preventDefault() // stop the browser from reloading the page

    const cleanTitle = title.trim()
    const cleanAuthor = author.trim()

    // Basic form validation + error handling
    if (cleanTitle === '' || cleanAuthor === '') {
      setError('Please enter both the book title and the author name.')
      return
    }

    const isDuplicate = books.some(
      (book) =>
        book.title.toLowerCase() === cleanTitle.toLowerCase() &&
        book.author.toLowerCase() === cleanAuthor.toLowerCase(),
    )
    if (isDuplicate) {
      setError('This book is already in the list.')
      return
    }

    const newBook = { id: Date.now(), title: cleanTitle, author: cleanAuthor }

    // Never change state directly. Make a NEW array: old books + new book.
    setBooks([...books, newBook])

    // Reset the form and clear any old error
    setTitle('')
    setAuthor('')
    setError('')
  }

  // Delete one book: keep every book whose id is NOT the deleted one
  function handleDeleteBook(id) {
    setBooks(books.filter((book) => book.id !== id))
  }

  // Remove all books (shows the "No Books Available" condition)
  function handleClearAll() {
    setBooks([])
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Book Management System</h1>

        {/* Requirement B: show the welcome message set by useEffect */}
        <p className="welcome" role="status">{welcomeMessage}</p>
      </header>

      {/* Requirement D: show the notification set by useEffect */}
      <div className="notification" role="status" aria-live="polite">
        {notification}
      </div>

      {/* ---------- Add Book form ---------- */}
      <form className="book-form" onSubmit={handleAddBook} noValidate>
        <h2>Add a New Book</h2>

        <div className="form-row">
          {/* Controlled inputs: the value comes from state, and onChange
              updates the state every time the user types. */}
          <input
            type="text"
            placeholder="Book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            aria-label="Book title"
          />
          <input
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            maxLength={100}
            aria-label="Author name"
          />
          <button type="submit" className="btn btn-add">Add Book</button>
        </div>

        {/* Show the error message only when there is an error */}
        {error && <p className="error" role="alert">{error}</p>}
      </form>

      {/* ---------- Book list section ---------- */}
      <section>
        <div className="list-header">
          {/* -----------------------------------------------------
              REQUIREMENT C: Conditional rendering with JSX
              -----------------------------------------------------
              The ternary operator (condition ? A : B) shows
              "Books Available" when the list has 1 or more books,
              and "No Books Available" when the list is empty. */}
          {books.length > 0 ? (
            <h2 className="status available">Books Available</h2>
          ) : (
            <h2 className="status empty">No Books Available</h2>
          )}

          <div className="list-actions">
            <span className="count">Total: {books.length}</span>
            <button
              type="button"
              className="btn btn-clear"
              onClick={handleClearAll}
              disabled={books.length === 0}
            >
              Clear All Books
            </button>
          </div>
        </div>

        {/* More conditional rendering: cards when there are books,
            a friendly hint when the list is empty. */}
        {books.length > 0 ? (
          <div className="book-grid">
            {/* .map() loops over the array and creates one <BookCard />
                for each book. We pass title and author as PROPS.
                "key" helps React track each item in the list. */}
            {books.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                onDelete={handleDeleteBook}
              />
            ))}
          </div>
        ) : (
          <p className="empty-hint">
            Your list is empty. Use the form above to add a book.
          </p>
        )}
      </section>
    </div>
  )
}

export default BookManagement
