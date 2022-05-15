import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { SectionWraper } from "./Section/Section";
import { useDispatch, useSelector } from "react-redux";
import {
  addContacts,
  removeContacts,
  filterContacts,
  getContacts,
  getFilter
} from "redux/itemsSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyEmptyList } from "components/Notify/Notify";

export const App = () => {

  const dispatch = useDispatch();
  const contactsItems = useSelector(getContacts);
  const fiterItems = useSelector(getFilter);

  const heandleAddContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    contactsItems.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? toast.error(`${name} is already in contacts`)
      : dispatch(addContacts(newContact))
  };

  const heandleChangeFilter = event => {
    const { value } = event.currentTarget;
    dispatch(filterContacts(value))
  }; 

  const filteredContactList = () => {
    const normilizFilterValue = fiterItems.toLowerCase().trim();
    return contactsItems.filter(contact =>
      contact.name.toLowerCase().includes(normilizFilterValue))
  };

  const deleteContact = id => {
     return dispatch(removeContacts(id));
  };

  return (
    <SectionWraper>
      <>
      <ToastContainer/>
      </>
      <h1>Phonebook</h1>
      <ContactForm
        onSubmit={heandleAddContact} />
        
      <h2>Contacts</h2>
      {contactsItems.length > 0 && <Filter
        value={fiterItems}
        onChangeFilter={heandleChangeFilter} />}
      
      {contactsItems.length > 0 ? (<ContactList
        contacts={filteredContactList()}
        onDeleteContact={deleteContact} />)
        : <NotifyEmptyList />
      }
    </SectionWraper>
  )
};

// export const App = () => {

//   const [contacts, setContacts] = useState([
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const lsContacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(lsContacts);

//     parsedContacts ? setContacts(parsedContacts) : setContacts(contacts)
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   },[])
  
//   useEffect(() => {
//   localStorage.setItem('contacts', JSON.stringify(contacts))
//   }, [contacts])
  
//   const heandleAddContact = ({ name, number }) => {
//     const newContact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
//       ? alert(`${name} is already in contacts`)
//       : setContacts(prevContacts => [...prevContacts, newContact])
//   };

//   const heandleChangeFilter = event => {
//     const { value } = event.currentTarget;
//     setFilter(value)
//   };

//   const filteredContactList = () => {
//     const normilizValue = filter.toLowerCase().trim();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normilizValue))
//   };

//   const deleteContact = contactId => {
//     setContacts(prevContacts => prevContacts.filter(
//       contact => contact.id !== contactId)
//     );
//   };

//   return (
//     <SectionWraper>
//       <h1>Phonebook</h1>
//       <ContactForm
//         onSubmit={heandleAddContact} />
        
//       <h2>Contacts</h2>
//       {contacts.length > 0 && <Filter
//         value={filter}
//         onChangeFilter={heandleChangeFilter} />}
      
//       {contacts.length > 0 ? (<ContactList
//         contacts={filteredContactList()}
//         onDeleteContact={deleteContact} />)
//         : alert`Contact list is empty`
//       }
//     </SectionWraper>
//   )
// };