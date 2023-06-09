import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

const ContactForm = () => {
  const [userName, setUserName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const handleInputChange = ({ target: { name, value } }) => {
    if (name === 'number')
      if (contacts.some(contact => contact.number === value))
        return toast.error(`Number ${value} is also in your contact list!`);
      else setNumber(value);
    if (name === 'userName')
      if (contacts.some(contact => contact.name === value))
        return toast.error(`${value} is also in your contact list!`);
      else setUserName(value);
  };

  const reset = () => {
    setUserName('');
    setNumber('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(addContact(userName, number));
    reset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="userName"
          value={userName}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
};

export default ContactForm;
