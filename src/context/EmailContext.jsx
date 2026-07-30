import { createContext, useContext, useState } from "react";
import { emails as staticEmails } from "../assets/emails";
import { useLocation } from "react-router-dom";
const EmailContext = createContext()

export const EmailProvider =  ({children}) => {
    const [emails,setEmails]=useState(staticEmails)
    const [selectedEmails,setSelectedEmails] = useState([])
    const [checked,setChecked]=useState(false)
    const location = useLocation()

const handleSelectEmail = (id) => {
  setSelectedEmails((prev) =>
    prev.includes(id)
      ? prev.filter((emailId) => emailId !== id)
      : [...prev, id]
  );
};


const handleSelectAll = () => {
  let filteredEmails = [];
    setChecked((prev) => !prev);


  switch (location.pathname) {
    case "/":
      filteredEmails = emails.filter(
        (email) => email.folder === "Inbox"
      );
      break;

    case "/starred":
      filteredEmails = emails.filter(
        (email) => email.starred
      );
      break;

    case "/sent":
      filteredEmails = emails.filter(
        (email) => email.folder === "Sent"
      );
      break;

    case "/drafts":
      filteredEmails = emails.filter(
        (email) => email.folder === "Drafts"
      );
      break;

    case "/trash":
      filteredEmails = emails.filter(
        (email) => email.folder === "Trash"
      );
      break;

    default:
      filteredEmails = emails;
  }

  const ids = filteredEmails.map((email) => email.id);

  setSelectedEmails(ids);
};
    return(

        <EmailContext.Provider value={
           { emails,
            setEmails,
            handleSelectAll,
            selectedEmails,
            setSelectedEmails,
            checked,setChecked,
        handleSelectEmail}
        }
        >
            {children}

        </EmailContext.Provider>
    )
}
export const useEmail = () => {
  return useContext(EmailContext);
};