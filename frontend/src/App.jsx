<<<<<<< HEAD
import React from 'react'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  )
}

export default App
=======
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
>>>>>>> upstream/master
