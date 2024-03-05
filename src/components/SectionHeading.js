import React from 'react';

const SectionHeading = ({ heading }) => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', marginLeft:"-1%"  }}>
        <hr></hr>
      <h2 style={{ color: '#333', margin: 0 }}>{heading}</h2>
      <hr></hr>
    </div>
  );
};

export default SectionHeading;

