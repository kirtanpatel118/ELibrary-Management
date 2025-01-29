import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewBooks.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/view-books');
                if (response.data.ok) {
                    setBooks(response.data.books);
                }
                console.log(response.data.books);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div className="booklist-loading">Loading...</div>;
    }

    if (error) {
        return <div className="booklist-error">Error: {error}</div>;
    }

    return (
        <div className="booklist-container">
            <h1 className="booklist-heading">Book List</h1>
            <table className="booklist-table">
                <thead>
                    <tr className="booklist-table-header">
                        <th className="booklist-table-th">Book Name</th>
                        <th className="booklist-table-th">Author</th>
                        <th className="booklist-table-th">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id} className="booklist-table-row">
                            <td className="booklist-table-data">
                                <img
                                    src={book.BookPhoto.url}
                                    alt={book.Bookname}
                                    className="booklist-book-image"
                                />
                                {book.Bookname}
                            </td>
                            <td className="booklist-table-data">{book.Author}</td>
                            <td className="booklist-table-data">{book.Quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;