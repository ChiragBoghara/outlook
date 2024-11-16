import { useContext } from "react";
import EmailCard from "../emailcard/EmailCard";
import "./EmailList.scss";
import SelectedEmailBox from "../selectedemailbox/SelectedEmailBox";
import { EmailContext } from "../../context/EmailContext";
import { getFromLocalStorage } from "../../utils/localStorage";

const EmailList = () => {
  const {
    filteredEmails,
    selectedEmail,
    setSelectedEmail,
    markAsRead,
    loading,
    error,
  } = useContext(EmailContext);

  const onEmailCardClick = (email) => {
    setSelectedEmail(() => email);
    markAsRead(email.id);
  };

  const isRead = (emailId) => {
    const read = getFromLocalStorage("read");
    return read.includes(emailId);
  };

  return (
    <section className="emails">
      <article
        className={!selectedEmail ? "all-emails full-width" : "all-emails"}
      >
        {loading && <p>Loading data...</p>}
        {error && <p>Something went wrong!</p>}
        {!loading && !error && filteredEmails.length === 0
          ? "No emails found"
          : filteredEmails.map((email) => (
              <EmailCard
                key={email.id}
                email={email}
                handleClick={onEmailCardClick}
                selectedEmailId={!selectedEmail ? "" : selectedEmail.id}
                classes={isRead(email.id) ? "email-card read" : "email-card"}
              />
            ))}
      </article>
      {selectedEmail && <SelectedEmailBox selectedEmail={selectedEmail} />}
    </section>
  );
};

export default EmailList;
