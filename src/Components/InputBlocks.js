import React from 'react'
import { PlusIcon } from "@heroicons/react/outline";
import { v4 } from "uuid";
import { useState } from "react";

export default function InputBlocks({ blocks, setBlocks }) {
  const [block, setBlock] = useState("");

  const handleClick2 = () => {
    if (!block) {
      alert("This fields is required!");
      return;
    }

    if (isNaN(block) || block <= 0) {
      alert("Block size must be a positive number!");
      return;
    }

    const newBlock = {
      id: `block_${v4()}`,
      block: parseInt(block, 10),
    };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    setBlock(""); // Clear inputs
  };
  return (
    <div className='input-wrapper'>
      <input
        type="text"
        value={block}
        onChange={(event) => {
          setBlock(event.target.value);
        }}
        placeholder="Memory block size in MB"
      />

      <button className='add-button' onClick={handleClick2}>
        <PlusIcon />
      </button>

    </div>
  );
};



