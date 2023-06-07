import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm.jsx/ContactForm';
import Filter from '../Filter.jsx/Filter';
import ContactList from '../ContactList/ContactList';
import { Container, Title, Contacts } from './App.styled';
import { useLocalStorage } from 'hooks/useLocalStorage';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');
  const addContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(state => [...state, contact]);
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  const handleFilterChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterByName = filter => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const filtredContacts = filterByName(normalizedFilter);
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addContact} />
      {contacts.length !== 0 && (
        <>
          <Contacts>Contacts</Contacts>
          <Filter value={filter} onChange={handleFilterChange} />
          <ContactList contacts={filtredContacts} onDelete={deleteContact} />
        </>
      )}
    </Container>
  );
};

export default App;
