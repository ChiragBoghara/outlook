import "./SelectedEmailBox.scss";
import UserInitialAvatar from "../userInitial-avatar/UserInitialAvatar";
import { getEmailBody } from "../../services/emailService";
import getFormattedDate from "../../utils/formatDate";
import { useContext, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { getFromLocalStorage } from "../../utils/localStorage";
import { EmailContext } from "../../context/EmailContext";

const SelectedEmailBox = ({ selectedEmail }) => {
  const { id, from, subject, date } = selectedEmail;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { markAsFavorite } = useContext(EmailContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getEmailBody(id);
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
    const favorites = getFromLocalStorage("favorites");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleFavoriteChange = () => {
    markAsFavorite(id);
    setIsFavorite((favorite) => !favorite);
  };

  const formattedDate = getFormattedDate(date);
  const initialLetter = from.name[0]?.toUpperCase();

  return (
    <aside className="selected-email">
      <UserInitialAvatar letter={initialLetter} />
      <div className="selected-email__content">
        <header className="selected-email__content-header">
          <h1>{subject}</h1>
          <button
            className={
              isFavorite ? "favorite-button favorite" : "favorite-button"
            }
            onClick={handleFavoriteChange}
            tabIndex={0}
            aria-label="Mark as favourite"
          >
            {isFavorite ? "Unfavorite" : "Mark as favourite"}
          </button>
        </header>
        <p className="selected-email__content-date">{formattedDate}</p>
        <main className="selected-email__content-body">
          {loading ? (
            "Loading content..."
          ) : error ? (
            "Something went wrong! "
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data) }}
            />
          )}
        </main>
      </div>
    </aside>
  );
};

export default SelectedEmailBox;
