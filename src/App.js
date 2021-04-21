import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AppContext } from './AppContext';
import Navbar from './components/navbar/Navbar';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Landing from './components/auth/Landing';
import Footer from './components/footer/Footer';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { initializeAuth } = useContext(AppContext);

  useEffect(() => {
    // for refreshing page
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/contact/addcontact' component={AddContact} />
        <Route exact path='/contacts/edit/:id' component={EditContact} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
