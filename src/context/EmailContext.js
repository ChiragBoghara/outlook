import React, { createContext, useState, useEffect } from "react";
import { getEmails } from "../services/emailService";
import { getFromLocalStorage, updateLocalStorage } from "../utils/localStorage";

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        setLoading(true);
        const response = await getEmails();
        setEmails(response.emails);
        const read = getRead();
        const filteredEmails = response.emails.filter((email) => {
          return !read.includes(email.id);
        });
        setFilteredEmails(filteredEmails);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmails();
  }, []);

  const getRead = () => getFromLocalStorage("read");
  const getFavorites = () => getFromLocalStorage("favorites");

  const markAsFavorite = (emailId) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.includes(emailId)
      ? favorites.filter((id) => id !== emailId) 
      : [...favorites, emailId];

    updateLocalStorage("favorites", updatedFavorites);
  };

  const markAsRead = (emailId) => {
    const read = getRead();
    if (!read.includes(emailId)) {
      updateLocalStorage("read", [...read, emailId]);
    }
  };

  const applyFilter = (index) => {
    let filteredEmails = [];
    if (index === 0) {
      const read = getRead();
      filteredEmails = emails.filter((email) => {
        return !read.includes(email.id);
      });
    } else if (index === 1) {
      const read = getRead();
      filteredEmails = emails.filter((email) => {
        return read.includes(email.id);
      });
    } else {
      const favorites = getFavorites();
      filteredEmails = emails.filter((email) => {
        return favorites.includes(email.id);
      });
    }
    setFilteredEmails(filteredEmails);
  };

  return (
    <EmailContext.Provider
      value={{
        loading,
        error,
        filteredEmails,
        selectedEmail,
        setSelectedEmail,
        markAsFavorite,
        markAsRead,
        applyFilter
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};
