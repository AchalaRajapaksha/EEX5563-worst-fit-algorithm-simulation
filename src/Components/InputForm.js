import React, { useState } from 'react';
import Input from './Input'
import Process from './Process';

function InputForm() {
  const [processes, setProcesses] = useState([]);
  
  
  return (
    <div>
<h1>Worst fit algorithm simulation</h1>
      <Input processes={processes} setProcesses={setProcesses}  />
      <div>{processes.map((item) => { return <Process key={item.id} process={item } /> })}</div>
    </div>
  );
};


export default InputForm;