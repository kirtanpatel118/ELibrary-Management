
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './BookUpdate.css';

function BookUpdate() {
    const location = useLocation();
    const navigate = useNavigate();




    const [BookData, setBookData] = useState(location.state.Book || {
        Category: '',
        Bookname: '',
        Bookid: '',
        Author: '',
        BookPhoto: '',
        url: ''
        // BookPdf: null,
    });

    useEffect(() => {
        if (location.state.Book) {
            setBookData(location.state.Book);
        }
    }, [location.state.Book]);
    console.log(location.state.Book);
    console.log(BookData);

    // const updateBook = async (updatedBook) => {

    //     const book = location.state.Book;
    //     const bID = book._id;
    //     console.log(bID);

    //     axios
    //         .patch(`http://localhost:3000/admin/update-book/${bID}`, updatedBook)
    //         .then((response) => {
    //             if (response.data.ok) {
    //                 console.log("book updated succefuuly");
    //                 toast.success('book update Successfully!');
    //                 navigate('/admin/add-book');
    //             }
    //         })

    //         .catch((error) => {
    //             console.error('Error updating Book:', error);
    //             toast.error(err.response?.data?.message);
    //         });
    // }



    // const handleFileChange = (e) => {
    //     setBookData({ ...BookData, BookPhoto: e.target.files[0] });
    // };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setBookData((prevBookData) => ({
            ...prevBookData,
            BookPhoto: file, // Store the file directly
        }));
    };

    const handleOnChange = (event) => {
        console.log('handleInputChange called');
        const { name, value } = event.target;
        setBookData((prevBookData) => ({ ...prevBookData, [name]: value }));
    };
    // const updateBook = async (updatedBook) => {
    //     const book = location.state.Book;
    //     const bID = book._id;
    //     const formData = new FormData();

    //     // Append all fields to the FormData object
    //     for (const key in updatedBook) {
    //         formData.append(key, updatedBook[key]);
    //     }

    //     try {
    //         const response = await axios.patch(`http://localhost:3000/admin/update-book/${bID}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data', // Important for file uploads
    //             },
    //         });

    //         if (response.data.ok) {
    //             console.log("Book updated successfully");
    //             toast.success('Book updated successfully!');
    //             navigate('/admin/add-book');
    //         }
    //     } catch (error) {
    //         console.error('Error updating Book:', error);
    //         toast.error(error.response?.data?.message || 'Error updating book');
    //     }
    // };
    const updateBook = async (updatedBook) => {
        const book = location.state.Book;
        const bID = book._id;
        const formData = new FormData();

        // Append all fields to the FormData object
        for (const key in updatedBook) {
            formData.append(key, updatedBook[key]);
        }

        // Append the BookPhoto if it exists
        if (updatedBook.BookPhoto) {
            formData.append('BookPhoto', updatedBook.BookPhoto);
        }

        try {
            const response = await axios.patch(`http://localhost:3000/admin/update-book/${bID}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            if (response.data.ok) {
                console.log("Book updated successfully");
                toast.success('Book updated successfully!');
                navigate('/admin/add-book');
            }
        } catch (error) {
            console.error('Error updating Book:', error);
            toast.error(error.response?.data?.message || 'Error updating book');
        }
    };




    const handleSubmit = (event) => {
        event.preventDefault();
        updateBook(BookData);
    };

    return (
        <>
            <form className="update-book-form" onSubmit={handleSubmit}>
                <h2 className="update-book-heading">Update Book</h2>


                {/* <input
        type="radio"
        className="update-book-radio"
        value="Science"
        id="science"
        name="Category"
        checked={BookData.Category === 'Science'}
        onChange={handleOnChange}
    />
    <label className="update-book-radio-label" htmlFor="science">Science</label>

    <input
        type="radio"
        className="update-book-radio"
        value="History"
        id="History"
        name="Category"
        checked={BookData.Category === 'History'}
        onChange={handleOnChange}
    />
    <label className="update-book-radio-label" htmlFor="History">History</label>

    <input
        type="radio"
        className="update-book-radio"
        value="Math"
        id="Math"
        name="Category"
        checked={BookData.Category === 'Math'}
        onChange={handleOnChange}
    />
    <label className="update-book-radio-label" htmlFor="Math">Math</label>
    <br className="update-book-spacer" />

    <label className="update-book-label">Category:</label>
    <input
        type="text"
        className="update-book-input"
        name="Category"
        value={BookData.Category}
        onChange={handleOnChange}
    /> */}
                <label className="update-book-label">Book Category:</label>
                <select className="form-select" id="category" name="Category" onChange={handleOnChange} value={BookData.Category} required>
                    <option value="" selected disabled>Choose category</option>
                    <option value="Programming">Programming</option>
                    <option value="Law">Law</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Designing">Designing</option>
                </select>
                <label className="update-book-label">Book Name:</label>
                <input
                    type="text"
                    className="update-book-input"
                    name="Bookname"
                    value={BookData.Bookname}
                    onChange={handleOnChange}
                />
                <label className="update-book-label">Book ID:</label>
                <input
                    type="text"
                    className="update-book-input"
                    name="Bookid"
                    value={BookData.Bookid}
                    onChange={handleOnChange}
                />
                <label className="update-book-label">Author:</label>
                <input
                    type="text"
                    className="update-book-input"
                    name="Author"
                    value={BookData.Author}
                    onChange={handleOnChange}
                />
                <label className="update-book-label">Book Photo:</label>
                <img
                    src={BookData.BookPhoto.url}
                    alt="book"
                    className="update-book-image"
                />
                <input
                    type="file"
                    className="update-book-input"
                    name="BookPhoto"
                    onChange={handleFileChange}
                />
                <button className="update-book-button" type="submit">Update Book</button>
            </form>

        </>
    );

}

export default BookUpdate;
