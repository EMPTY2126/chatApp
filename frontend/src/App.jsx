import "./App.css";
import {AuthProvider } from './context/AuthContext.jsx';
import PageHandler from "./pages/PageHandler.jsx";

function App() {
  return (
    <AuthProvider>
      <PageHandler />
    </AuthProvider>
  );
}

export default App;