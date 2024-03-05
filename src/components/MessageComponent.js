// MessageComponent

import React from 'react';
import TableComponent from './TableComponent';

const MessageComponent = ({ clubId }) => (
  <div className="col-md-3">
    {clubId ? (
      <TableComponent clubId={clubId} />
    ) : (
      <p>No clubId received</p>
    )}
  </div>
);

export default MessageComponent;

