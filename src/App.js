import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register'; 
import UpdateInfo from './UpdateInfo';
import ForgotPassword from './Forgot_Password';
import Home from './Home'
import './App.css';
import PeopleSearching from './PeopleSearching';
import TextbookSearching from './TextbookSearching';
import PurchaseTextbooks from './PurchaseTextbooks';
import RoommateFinding from './RoommateFinding';
import MealPlan from './MealPlan';
import PurchaseBusTicket from './PurchaseBusTicket';
import ScheduledActivities from './ScheduledActivities';
import Election from './Election';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path= "/home" element={<Home/>}/>
          <Route exact path="/" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/update" element={<UpdateInfo/>}/>
          <Route exact path='/people-search' element={<PeopleSearching/>}/>
          <Route exact path='/textbook-search' element={<TextbookSearching/>}/>
          <Route exact path='/purchase-books' element={<PurchaseTextbooks/>}/>
          <Route exact path="/roommate-find" element={<RoommateFinding/>}/>
          <Route exact path= "/meal-plan" element={<MealPlan/>}/>
          <Route exact path= "/purchase-ticket" element={<PurchaseBusTicket/>}/>
          <Route exact path="/scheduled-activities" element={<ScheduledActivities/>}/>
          <Route exact path="/election" element={<Election/>}/>
          <Route exact path="/forgot-password" element={<ForgotPassword/>}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
