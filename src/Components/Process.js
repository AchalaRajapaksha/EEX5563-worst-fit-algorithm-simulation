import { TrashIcon } from '@heroicons/react/outline';
import React from 'react';

function Process({ process, index, processes, setProcesses }) {
  const handleDelete = () => {
    const newProcesses = processes.filter((item) => { if (process.id == item.id) { return false; } else { return true; } });
    setProcesses(newProcesses);
  };

  return (
    <div className='list-wrapper'>
      <div>{index}.</div>
      <div>
        {process.name} - size-{process.size} MB
      </div>
      <button className="delete-button" onClick={handleDelete}><TrashIcon/></button>
    </div>
  );
};

export default Process;