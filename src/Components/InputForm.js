import React, { useState } from "react";
import Input from "./Input";
import InputBlocks from "./InputBlocks";
import Process from "./Process";
import Block from "./Block";
import  "./InputForm.css";

function InputForm() {
  const [processes, setProcesses] = useState([]);
  const [blocks, setBlocks] = useState([]);

  // Function to simulate Worst Fit Allocation
  const allocateWorstFit = () => {
    let updatedBlocks = [...blocks];
    let updatedProcesses = [...processes];

    // Step 1: Sort blocks in descending order of size
    updatedBlocks.sort((a, b) => b.block - a.block);

    // Step 2: For each process, allocate to the largest available block
    updatedProcesses.forEach((process) => {
      let allocated = false;

      // Step 3: Find the largest block that can fit the process
      for (let i = 0; i < updatedBlocks.length; i++) {
        if (updatedBlocks[i].block >= process.size && !allocated) {
          // Allocate process to this block
          updatedBlocks[i].block -= process.size; // Decrease the block size
          process.allocatedTo = updatedBlocks[i].id; // Store the block ID where it's allocated
          allocated = true;
        }
      }

      // Step 4: If no block is found, mark process as unallocated
      if (!allocated) {
        process.allocatedTo = "Not Allocated";
      }
    });

    // Set the updated blocks and processes
    setBlocks(updatedBlocks);
    setProcesses(updatedProcesses);
  };

  // Function to clear all added processes and blocks
  const clearAll = () => {
    setProcesses([]); // Clear processes
    setBlocks([]); // Clear blocks
  };

  return (
     <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
      <h1>Worst fit algorithm simulation</h1>
      <Input processes={processes} setProcesses={setProcesses} />
      <InputBlocks blocks={blocks} setBlocks={setBlocks} />
         
           <div>
        <button onClick={allocateWorstFit}>Run Simulation</button>
        <button onClick={clearAll}>Clear All</button>
        </div>
        
       {/* Display original inputs for reference */}
          <div>
            <h3>Entered Processes</h3>
            <table>
              <thead>
                <tr>
                  <th>Process Name</th>
                  <th>Process Size</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3>Entered Memory Blocks</h3>
            <table>
              <thead>
                <tr>
                  <th>Block ID</th>
                  <th>Block Size</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.block}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Section */}
        <div>
  <h3>Entered Processes</h3>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Process Name</th>
        <th>Process Size</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {processes.map((process, index) => (
        <Process
          key={process.id}
          process={process}
          index={index}
          onDelete={(id) => setProcesses(processes.filter((p) => p.id !== id))}
        />
      ))}
    </tbody>
  </table>
</div>

<div>
  <h3>Entered Memory Blocks</h3>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Block Size</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {blocks.map((block, index) => (
        <Block
          key={block.id}
          block={block}
          index={index}
          onDelete={(id) => setBlocks(blocks.filter((b) => b.id !== id))}
        />
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}

export default InputForm;
