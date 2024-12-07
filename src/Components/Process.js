import React from 'react';

function Process({ process }) {
  return (
    <div>
      {process.name} size-{ process.size}
    </div>
  );
};

export default Process;