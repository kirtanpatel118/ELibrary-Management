const Book = require('../Model/Book'); // Adjust the path as necessary

const SearchBook = async (req, res) => {
    // const { Bookname, Category } = req.body; // Ensure these match your request structure
    const BookData=req.body
    console.log(BookData);

    try {
        // Create a query object
        const query = {};
        if(!Bookname)
        {
            console.log("bookname not getting");
        }
        if (Bookname) {
            query.Bookname = { $regex: Bookname, $options: 'i' }; // Case-insensitive search
        }
        
        if (Category) {
            query.Category = Category; // Exact match for category
        }

        // Find books that match the search query
        const foundBooks = await Book.find(query);

        if (foundBooks.length > 0) {
            return res.json({ ok: true, message: 'Books found', books: foundBooks });
        } else {
            return res.json({ ok: false, message: 'No books found' });
        }
    } catch (error) {
        console.error("Error searching for books:", error);
        return res.status(500).json({ ok: false, message: 'Internal Server Error' });
    }
};

module.exports = SearchBook;