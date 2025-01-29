const BookRequest = require('../Model/BookRequest');
const Faculty = require('../Model/Faculty');

// Function to find faculty by ID using findById
async function findFacultyByEmail(email) {
  try {
    const faculty = await Faculty.findOne({email:email}); // Use findById instead of findOne
    if (!faculty) {
      return { error: 'Faculty not found' };
    }
    return faculty;
  } catch (error) {
    console.error('Error fetching faculty:', error);
    return { error: 'Internal server error' };
  }
}

// Function to request a book
const RequestBook = async (req, res) => {
  const { title, author, genre, comments } = req.body;
  const userEmail = req.params.userEmail; // Get the user ID from the request parameters

  // Validate input
  if (!title || !author || !genre) {
    return res.status(400).json({ message: 'Please provide title, author, and genre.' });
  }
  console.log(userEmail);
  // Check if userID is valid before proceeding
  if (!userEmail || userEmail === 'null') {
    return res.status(400).json({ message: 'Invalid user ID provided.' });
  }

  // Find the faculty member by ID using the findFacultyById function
  const user = await findFacultyByEmail(userEmail);

  // Check if an error was returned
  if (user.error) {
    return res.status(404).json({ message: user.error });
  }

  // Extract the faculty member's first and last names
  const firstname = user.firstname;
  const lastname = user.lastname;
  const userID=user._id;

  try {
    console.log(title, author, genre, comments, userEmail);

    // Create a new book request
    const newRequest = new BookRequest({
      userID,
      firstname,
      lastname,
      title,
      author,
      genre,
      comments,
      requestedAt: new Date(),
    });

    // Save the new book request to the database
    await newRequest.save();
    return res.status(201).json({ ok: true, message: 'Book request submitted successfully!', request: newRequest });
  } catch (error) {
    console.error('Error processing book request:', error);
    return res.status(500).json({ message: 'An error occurred while processing your request.', ok: false });
  }
};

// Function to fetch all book requests
const NewBookRequestFetch = async (req, res) => {
  try {
    const bookRequests = await BookRequest.find();
    return res.status(200).json({ bookRequests });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching book requests' });
  }
};

// Export the functions for use in other modules
module.exports = { RequestBook, NewBookRequestFetch };