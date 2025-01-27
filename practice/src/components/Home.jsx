import React from 'react';

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <h1>Welcome, {user.name}!</h1>
      <p>Your role: {user.role}</p>
      {/* Add more features here */}
    </div>
  );
};

export default Home;
