import React from 'react'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'
import LoginScreen from './Screens/LoginScreen/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import HomeScreen from './Screens/HomeScreen/HomeScreen'
import CreateWorkspaceScreen from './Screens/CreateWorkspaceScreen/CreateWorkspaceScreen'
import EditTreatmentScreen from './Screens/EditTreatmentScreen/EditTreatmentScreen'
import AuthContextProvider from './Context/AuthContext'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import WorkspaceContextProvider from './Context/WorkspaceContext'
import AppointmentsScreen from "./Screens/AppointmentsScreen/AppointmentsScreen.jsx";
import CreatePatientScreen from './Screens/CreatePatientScreen/CreatePatientScreen'
import CreateAppointmentScreen from './Screens/CreateAppointmentScreen/CreateAppointmentScreen'
import PatientsScreen from './Screens/PatientsScreen/PatientsScreen'
import EditPatientScreen from './Screens/EditPatientScreen/EditPatientScreen'

function App() {
  return (
    <AuthContextProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }} 
      />
      
      <Routes>
        <Route path='/' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        
        <Route element={<AuthMiddleware />}>
        <Route path='/appointments' element={<AppointmentsScreen />} />
          <Route path='/home' element={
            <WorkspaceContextProvider>
              <HomeScreen />
            </WorkspaceContextProvider>
          } />
          
          <Route path='/create-workspace' element={
            <WorkspaceContextProvider>
              <CreateWorkspaceScreen />
            </WorkspaceContextProvider>
          } />
          
          <Route path="/edit-treatment/:id" element={
            <WorkspaceContextProvider>
              <EditTreatmentScreen />
            </WorkspaceContextProvider>
          } />
        </Route>
        <Route path='/create-appointment' element={
            <WorkspaceContextProvider>
              <CreateAppointmentScreen />
            </WorkspaceContextProvider>
          } />
          <Route path="/create-patient" element={<CreatePatientScreen />} />
          <Route path="/patients" element={<PatientsScreen />} />
          <Route path="/edit-patient/:id" element={<EditPatientScreen />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App