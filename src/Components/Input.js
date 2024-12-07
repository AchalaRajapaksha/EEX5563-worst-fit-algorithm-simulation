import React, { useState } from 'react';
import {PlusIcon} from "@heroicons/react/outline"

function Input() {

    const [process, setProcess] = useState ();
    const [size, setSize] = useState ();

    return (
    <div>
       <input type='text' value={process} onChange={(event)=>{setProcess(event.target.value)}} placeholder='Process description'/>
       <input type='text' value={size} onChange={(event)=>{setSize(event.target.value)}} placeholder='Process size'/>
       <button><PlusIcon/></button>
    </div>
  );
};

export default Input;