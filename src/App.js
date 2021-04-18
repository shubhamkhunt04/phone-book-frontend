import Navbar from './components/navbar/Navbar';
import Contacts from './components/contacts/Contacts';
import './styles/app.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Landing from './components/auth/Landing';
import { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';

const App = () => {
  const { initializeAuth } = useContext(AppContext);

  useEffect(() => {
    // for refreshing page
    initializeAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {/* <div className='App'>
          <header className='App-header'> */}
      <Navbar />
      {/* <div className='container'>
              <div className='py-3'> */}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/contact/addcontact' component={AddContact} />
        <Route exact path='/contacts/edit/:id' component={EditContact} />
      </Switch>
      {/* </div>
            </div>
          </header>
        </div> */}
    </Router>
  );
};

export default App;
