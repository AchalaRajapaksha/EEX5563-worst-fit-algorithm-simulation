import React, { useState } from "react";
import Input from "./Input";
import InputBlocks from "./InputBlocks";
import Process from "./Process";
import Block from "./Block";
import "./InputForm.css";

function InputForm() {
  const [processes, setProcesses] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [results, setResults] = useState([]); // Store simulation results

  // Function to simulate Worst Fit Allocation
  const allocateWorstFit = () => {
    // Step 1: Create a new array to track block states (including original sizes)
    const updatedBlocks = blocks.map((block) => ({
      ...block,
      remainingSize: block.block, // Track remaining size
    }));

    const simulationResults = [];

    // Step 2: Allocate each process
    processes.forEach((process) => {
      // Step 2a: Sort blocks by remaining size (descending) before each allocation
      updatedBlocks.sort((a, b) => b.remainingSize - a.remainingSize);

      let allocated = false;

      for (let i = 0; i < updatedBlocks.length; i++) {
        if (updatedBlocks[i].remainingSize >= process.size && !allocated) {
          const usedMemory = process.size;
          const freeMemory = updatedBlocks[i].remainingSize - usedMemory;

          // Add allocation to results
          simulationResults.push({
            blockSize: updatedBlocks[i].block, // Original size
            processName: process.name,
            processSize: usedMemory,
            usedMemory,
            freeMemory,
          });

          // Update block's remaining size
          updatedBlocks[i].remainingSize -= process.size;
          allocated = true;
        }
      }

      // If no block can fit the process, mark as unallocated
      if (!allocated) {
        simulationResults.push({
          blockSize: "N/A",
          processName: process.name,
          processSize: process.size,
          usedMemory: "N/A",
          freeMemory: "N/A",
        });
      }
    });

    // Step 3: Add blocks with remaining memory to results
    updatedBlocks.forEach((block) => {
      if (
        !simulationResults.some(
          (result) =>
            result.blockSize === block.block && result.processName !== "N/A"
        )
      ) {
        simulationResults.push({
          blockSize: block.block, // Original size
          processName: "N/A",
          processSize: "N/A",
          usedMemory: 0,
          freeMemory: block.remainingSize, // Remaining size
        });
      }
    });

    // Update the results state
    setResults(simulationResults);
  };

  // Function to clear all processes, blocks, and results
  const clearAll = () => {
    setProcesses([]);
    setBlocks([]);
    setResults([]);
  };

  return (
    <div className="input-form-container">
      <div className="input-section">
        <h1>Worst Fit Algorithm Simulation</h1>

        <Input processes={processes} setProcesses={setProcesses} />
        <InputBlocks blocks={blocks} setBlocks={setBlocks} />

        <div className="button-group">
          <button onClick={allocateWorstFit} className="run-button">
            Run Simulation
          </button>
          <button onClick={clearAll} className="clear-button">
            Clear All
          </button>
        </div>

        <div>
          <h3>Entered Processes</h3>
          {processes.map((process, index) => (
            <Process
              key={process.id}
              process={process}
              index={index + 1}
              processes={processes}
              setProcesses={setProcesses}
            />
          ))}
        </div>

        <div>
          <h3>Entered Memory Blocks</h3>
          {blocks.map((block, index) => (
            <Block
              key={block.id}
              block={block}
              index={index + 1}
              blocks={blocks}
              setBlocks={setBlocks}
            />
          ))}
        </div>
      </div>

      <div className="results-section">
        <h2>Simulation Results</h2>
        <table>
          <thead>
            <tr>
              <th>Memory Block Size</th>
              <th>Process Name</th>
              <th>Process Size</th>
              <th>Used Memory</th>
              <th>Free Memory</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.blockSize}</td>
                <td>{result.processName}</td>
                <td>{result.processSize}</td>
                <td>{result.usedMemory}</td>
                <td>{result.freeMemory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InputForm;
