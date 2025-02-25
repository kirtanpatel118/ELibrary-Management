// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// // import Book from '../../../../backend/Model/Book';

// function OurBooks() {
//         const [Books, setBooks] = useState([]);

//         useEffect(() => {
//                 const token = localStorage.getItem('jwt_token');
//                 if (token) {
//                         axios.get('http://localhost:3000/user/get-all-books', {
//                                 headers: { Authorization: `Bearer ${token}` },
//                         })
//                                 .then((response) => {
//                                         // if (response.data.ok) {
//                                         //         // console.log(response.data)
//                                         //         setBooks(response.data.books);
//                                         //         console.log(Books);
//                                         //         // setLoading(false);
//                                         //         // console.log(response.data.posts)

//                                         // }
//                                         // console.log('API response:', response.data);
//                                         if (response.data.ok) {
//                                                 setBooks(response.data.book);
//                                                 console.log(response.data.book);
//                                         }

//                                 })
//                                 .catch((error) => {
//                                         console.error("gadbad hai kuch:", error);
//                                 });
//                 }

//         }, [])

//         return (
//                 <>
//                         {/* <h1>our books</h1> */}

//                         <main>

//                                 <>

//                                         {Books.map((Book) => (
//                                                 <div key={Book._id}>
//                                                         <img
//                                                                 src={Book.BookPhoto.url}
//                                                                 alt='book from backend'
//                                                                 loading="fast"
//                                                         />
//                                                 </div>
//                                         ))}

//                                 </>
//                         </main>
//                 </>
//         );
// }

// export default OurBooks;


import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function OurBooks() {
  const [Books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [issuedBooksCount, setIssuedBooksCount] = useState(0);


  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      axios.get('http://localhost:3000/user/get-all-books', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            setBooks(response.data.book);
          }
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  }, []);

  useEffect(() => {
    console.log("Books:", Books);
  }, [Books]);

  const handleAddToCart = (book) => {
    setIssuedBooksCount((prevCount) => {
      const currentCount = prevCount[book._id] || 0;
    if (issuedBooksCount < 2) {
      setIssuedBooks((prevItems) => [...prevItems, book]);
      setIssuedBooksCount(issuedBooksCount + 1);
    }
    return prevCount; // Don't change the count if limit reached
  });
};



  return (
    <>
      <main>
      <h2>Total Issued Books: {issuedBooksCount}</h2>

        {Books.map((Book) => (

          <div key={Book._id}>
            <img
              src={Book.BookPhoto.url}
              alt='book from backend'
              loading="fast"
            />
            <p>Bookname:{Book.Bookname}</p>
            <p>Category:{Book.Category}</p>
            <p>Issued Count: {issuedBooksCount[Book._id] || 0}</p>
            <button
              onClick={() => handleAddToCart(Book)}
              disabled={issuedBooksCount >= 2}
            >
              {issuedBooksCount >= 2 ? 'Limit Reached' : 'Issue Book'}
            </button>



         
          </div>
        ))}

    </main >
    <Cart items={issuedBooks} />
    </>
  );
};

const Cart = ({ items }) => {
  return (
    <div>
      <h2>Issued Books ({items.length})</h2>
      {items.length === 0 ? (
        <p>No books issued</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.Bookname} by {item.Author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OurBooks;