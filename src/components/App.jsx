// import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { SectionWraper } from "./Section/Section";
import { useSelector } from "react-redux";
import { getContacts } from "redux/itemsSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyEmptyList } from "components/Notify/Notify";

export const App = () => {

  const contactsItems = useSelector(getContacts);

  return (
    <SectionWraper>
      <>
      <ToastContainer/>
      </>
      <h1>Phonebook</h1>
      <ContactForm/>  
      <h2>Contacts</h2>
      {contactsItems.length > 0 && <Filter/>}
      {contactsItems.length > 0 ? (<ContactList/>) : <NotifyEmptyList />
      }
    </SectionWraper>
  )
};