import React from 'react'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import NewMatches from './pages/NewMatches';
import DetectedMatch from './pages/DetectedMatch';
import MatchProcess from './pages/MatchProcess';
import EndProcess from './pages/EndProcess';
import MeetingSummary from './pages/MeetingSummary';
import 'react-toastify/dist/ReactToastify.css';
import User from './pages/User';
import About from './pages/About';
import Join from './pages/Join';
import Calender from './pages/Calender';
import PersonalInfo from './pages/PersonalInfo';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/notifications",
    element: <Notifications/>
  },
  {
    path: "/newmatches",
    element: <NewMatches/>
  },
  {
    path: "/detectedmatch",
    element: <DetectedMatch/>
  },
  {
    path: "/matchprocess",
    element: <MatchProcess/>
  },
  {
    path: "/endprocess",
    element: <EndProcess/>
  },
  {
    path: "/meetingsummary",
    element: <MeetingSummary/>
  },
  {
    path: "/candidates",
    element: <User/>
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/join",
    element: <Join/>
  },
  {
    path: "/calender",
    element: <Calender/>
  },
  {
    path: "/personalinformation",
    element: <Calender/>
  },
  {
    path: "/candidates/personalinfo",
    element: <PersonalInfo/>
  },
]);
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App