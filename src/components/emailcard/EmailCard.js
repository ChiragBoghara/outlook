import getFormattedDate from "../../utils/formatDate";
import UserInitialAvatar from "../userInitial-avatar/UserInitialAvatar";
import "./EmailCard.scss";

const EmailCard = ({ email, handleClick, selectedEmailId, classes }) => {
  const { id, from, subject, short_description, date } = email;
  const formattedDate = getFormattedDate(date);
  const initialLetter = from.name[0]?.toUpperCase();
  return (
    <article
      className={selectedEmailId === id ? `${classes} selected` : classes}
      onClick={() => {
        handleClick(email);
      }}
    >
      <UserInitialAvatar letter={initialLetter} />
      <div className="email-card__info">
        <p className="email-card__from">
          From:{" "}
          <span className="email-card__bold">
            {from.name} &lt;{from.email}&gt;
          </span>
        </p>
        {subject && (
          <p className="email-card__subject">
            Subject: <span className="email-card__bold">{subject}</span>
          </p>
        )}
        {short_description && (
          <p className="email-card__description">{short_description}</p>
        )}
        <time className="email-card__date" dateTime={date}>
          {formattedDate}
        </time>
      </div>
    </article>
  );
};

export default EmailCard;
