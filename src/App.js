import Navbar from './components/navbar/Navbar';
import Contacts from './components/contacts/Contacts';
import { Provider } from 'react-redux';
import './styles/app.scss';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import AddContact from './components/contacts/AddContact';
// import EditContact from './components/contacts/EditContact';
import Landing from './components/auth/Landing';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        {/* <div className='App'>
          <header className='App-header'> */}
            <Navbar />
            {/* <div className='container'>
              <div className='py-3'> */}
                <Switch>
                  <Route exact path='/' component={Landing} />
                  <Route exact path='/contacts' component={Contacts} />
                  {/* <Route exact path='/contacts/add' component={AddContact} /> */}
                  {/* <Route exact path='/contacts/edit/:id' component={EditContact} /> */}
                </Switch>
              {/* </div>
            </div>
          </header>
        </div> */}
      </Router>
    </Provider>
  );
};

export default App;