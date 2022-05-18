import { nanoid } from "nanoid";
import { useState } from 'react';
import { Form, Label, Text, Input, AddContactBtn } from './ContactForm.styled';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { addContacts, getContacts } from "redux/itemsSlice";

export const ContactForm = () => {

  const dispatch = useDispatch();
  const contactsItems = useSelector(getContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const heandleInputChange = (event) => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
    
      case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }
  };

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

  const heandleSubmit = event => {
    event.preventDefault();
    heandleAddContact({name, number})
    formFieldsReset()
  };

  const formFieldsReset = () => {
    setName('');
    setNumber('')
  };

  return (
    <>
      <Form onSubmit={heandleSubmit}>
        <Label>
          <Text>Name</Text>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={heandleInputChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder='Full name'
          />
        </Label>

        <Label>
          <Text>Phone</Text>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={heandleInputChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder='+XX-(XXX)-XXX-XX-XX'
          />
        </Label>
        <AddContactBtn type="submit">Add contact</AddContactBtn>
      </Form>
    </>
  );
};