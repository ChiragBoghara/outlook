import EmailList from "./components/emailslist/EmailList";
import FilterBar from "./components/filterbar/FilterBar";
import "./app.scss";
import { useContext } from "react";
import { EmailContext } from "./context/EmailContext";

const App = () => {
  const { applyFilter } = useContext(EmailContext);

  const filterOptions = [
    { label: "Unread" },
    { label: "Read" },
    { label: "Favorites" },
  ];

  return (
    <main>
      <FilterBar options={filterOptions} onFilterSelect={applyFilter} />
      <EmailList />
    </main>
  );
};

export default App;
