import React, { useState } from 'react';
import {PlusIcon} from "@heroicons/react/outline"

function Input({ processes, setProcesses, sizes, setSizes }) {

  const [process, setProcess] = useState("");
  const [size, setSize] = useState("");

  const handleClick = () => {
     if (!process || !size) {
      alert('Both fields are required!');
      return;
    }

    if (isNaN(size) || size <= 0) {
      alert('Process size must be a positive number!');
      return;
    }

      const newProcess = {
        id: 1,
        name: process,
        size: parseInt(size, 10),
      };

      const newProcesses = [...processes, newProcess];
      setProcesses(newProcesses);
      setProcess(""); // Clear inputs
      setSize("");
   
  };
    return (
    <div>
       <input type='text' value={process} onChange={(event)=>{setProcess(event.target.value)}} placeholder='Process description'/>
       <input type='text' value={size} onChange={(event)=>{setSize(event.target.value)}} placeholder='Process size'/>
       <button onClick={handleClick}><PlusIcon/></button>
    </div>
  );
};

export default Input;