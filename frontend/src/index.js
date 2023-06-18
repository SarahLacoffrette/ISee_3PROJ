import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'
import Home from './Pages/Home/HomePage';
import BrouillonProject from './Pages/Brouillon/Brouillon';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import ModifyUser from './Pages/UserPages/ModifyUser';
import UserHomePage from "./Pages/UserPages/UserHomePage";
import ActivationUser from './Pages/UserPages/ActivationUser';
import Video from './Pages/Video/Video.jsx';
import Studio from './Pages/Studio/Studio';
import Upload from './Pages/Studio/Upload/UploadVideo';
import SelectVideo from './Pages/Studio/SelectVideo';
import Update from './Pages/Studio/UpdateVideo';
import DeleteVideo from './Pages/Studio/DeleteVideo';
import reportWebVitals from './reportWebVitals';
import Admin from './Pages/Admin/AdminHomePage';
import AdminViewUsers from "./Pages/Admin/AdminViewUsers";
import AdminViewVideos from "./Pages/Admin/AdminViewVideos";
import AdminViewComments from "./Pages/Admin/AdminViewComments";
import AdminNotification from "./Pages/Admin/AdminNotification";
import Faq from './Pages/Home/Faq';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/brouillon' element={<BrouillonProject/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user' element={<UserHomePage/>}/>
        <Route path='/activation' element={<ActivationUser/>}/>
        <Route path='/modifyUser' element={<ModifyUser/>}/>
        <Route path='/studio' element={<Studio/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/update' element={<Update/>}/>
        <Route path='/video' element={<Video/>}/>
        <Route path='/selectVideo' element={<SelectVideo/>}/>
        <Route path='/deleteVideo' element={<DeleteVideo/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/adminViewUsers' element={<AdminViewUsers/>}/>
        <Route path='/adminViewVideos' element={<AdminViewVideos/>}/>
        <Route path='/adminViewComments' element={<AdminViewComments/>}/>
        <Route path='/adminNotification' element={<AdminNotification/>}/>
        <Route path='/faq' element={<Faq/>}/>
      </Routes>
    </BrowserRouter>
);

reportWebVitals();
