import './App.css';
import Login from './components/login';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import ChatRoom from './components/chatroom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

const App = () => {
  return (
  <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/" element={<ChatRoom/>}/>
        </Routes>
        <AddRoomModal/>
        <InviteMemberModal/>
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App;
