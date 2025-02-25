const Book=require('../../Model/Book');



const ViewBooks=async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ books, ok: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports=ViewBooks;