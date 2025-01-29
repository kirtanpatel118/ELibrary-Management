import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactQueries.css';

function ContactQueries() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/contact-queries');
        setContacts(response.data.contacts);
      } catch (err) {
        setError('Error fetching contacts');
        console.error(err);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="contactqueries-container">
      <h1 className="contactqueries-heading">User Queries</h1>
      {error && <div className="contactqueries-error">{error}</div>}
      <table className="contactqueries-table">
        <thead className="contactqueries-table-header">
          <tr>
            <th className="contactqueries-table-th">Name</th>
            <th className="contactqueries-table-th">Email</th>
            <th className="contactqueries-table-th">Message</th>
            <th className="contactqueries-table-th">Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id} className="contactqueries-table-row">
              <td className="contactqueries-table-data">{contact.name}</td>
              <td className="contactqueries-table-data">{contact.email}</td>
              <td className="contactqueries-table-data">{contact.message}</td>
              <td className="contactqueries-table-data">
                {new Date(contact.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactQueries;