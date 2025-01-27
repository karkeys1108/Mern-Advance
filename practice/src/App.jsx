import React, { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import withUser from './components/withUser';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const EnhancedHome = withUser(Home);

  return (
    <div className="app">
      {user ? (
        <EnhancedHome user={user} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;