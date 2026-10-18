// ---------------------------------------------------------------
// BookCard  (CHILD COMPONENT)   -> Requirement A
// ---------------------------------------------------------------
// A reusable component that shows ONE book.
// It does not own any data. Everything it needs arrives through PROPS:
//   - title    : the book title    (sent from the parent)
//   - author   : the book author   (sent from the parent)
//   - id       : unique id of the book (used when deleting)
//   - onDelete : a function from the parent that removes the book
//
// Props are read-only: the child can only display them or call them.
function BookCard({ id, title, author, onDelete }) {
  return (
    <div className="book-card">
      {/* JSX: curly braces { } insert JavaScript values into the page */}
      <h3 className="book-title">{title}</h3>
      <p className="book-author">by {author}</p>

      {/* Clicking the button calls the parent's delete function with this book's id */}
      <button
        type="button"
        className="btn btn-delete"
        onClick={() => onDelete(id)}
        aria-label={`Delete ${title}`}
      >
        Delete
      </button>
    </div>
  )
}

export default BookCard
