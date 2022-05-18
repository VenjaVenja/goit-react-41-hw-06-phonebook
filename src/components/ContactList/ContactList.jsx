import { useDispatch, useSelector } from "react-redux";
import { removeContacts, getContacts, getFilter } from "redux/itemsSlice";
import { Contact } from 'components/Contact/Contact';
import { ContactListEl, ContactListItem } from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contactsItems = useSelector(getContacts);
  const fiterItems = useSelector(getFilter);

  const filteredContactList = () => {
    const normilizFilterValue = fiterItems.toLowerCase().trim();
    return contactsItems.filter(contact =>
      contact.name.toLowerCase().includes(normilizFilterValue)
    );
  };
    console.log(filteredContactList())
    
  const deleteContact = id => {
    return dispatch(removeContacts(id));
  };

  return (
    <ContactListEl>
      {filteredContactList().map(({ id, name, number }) => (
        <ContactListItem key={id}>
          <Contact
            contactId={id}
            name={name}
            number={number}
            onDeleteContact={deleteContact}
          />
        </ContactListItem>
      ))}
    </ContactListEl>
  );
};