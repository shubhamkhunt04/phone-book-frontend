import Navbar from './components/navbar/Navbar';
import Contacts from './components/contacts/Contacts';
import {Provider} from 'react-redux'
import './styles/App.scss';
import store from './store';

const  App=()=> {
  return (
    <Provider store={store}>
      {/* <div className='App'> */}
        {/* <header className='App-header'> */}
          <Navbar />
          <div className='container'>
            <div className='py-3'>
              <Contacts />
            </div>
          </div>
        {/* </header> */}
      {/* </div> */}
    </Provider>
  );
}

export default App;
