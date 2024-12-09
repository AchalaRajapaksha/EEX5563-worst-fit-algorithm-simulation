import React from 'react'
import { TrashIcon } from "@heroicons/react/outline";

export default function Block({ block, index, blocks, setBlocks }) {
 
  const handleDelete = () => {
    const newBlocks = blocks.filter((item) => {
      if (block.id == item.id) {
        return false;
      } else {
        return true;
      }
    });
    setBlocks(newBlocks);
  };

  return (
    <div className='list-wrapper' >
      <div>{index}.</div>
      <div>
        {block.block} MB
      </div> 
      <button className="delete-button" onClick={handleDelete}>
        <TrashIcon />
      </button>
    </div>
  );
};

