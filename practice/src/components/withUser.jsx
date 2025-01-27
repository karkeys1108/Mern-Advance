import React from 'react';

const withUser = (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} />;
  };
};

export default withUser;
