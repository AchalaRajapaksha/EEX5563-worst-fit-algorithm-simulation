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
      allocations: block.allocations || [], // Ensure allocations are initialized as an empty array if undefined
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

          // Add allocation to results and track process in the block's allocations
          updatedBlocks[i].allocations.push({
            processName: process.name,
            processSize: usedMemory,
          });

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

    // Update the results state and blocks state
    setResults(simulationResults);
    setBlocks(updatedBlocks);
  };

  // Function to clear all processes, blocks, and results
  const clearAll = () => {
    setProcesses([]);
    setBlocks([]);
    setResults([]);
  };

  // Render memory block visualization
  const renderMemoryBlocks = () => {
    return blocks.map((block, index) => {
      let usedMemoryWidth = 0;
      let freeMemoryWidth = 100;

      // Calculate widths for visualization (percentage of block size)
      const totalBlockSize = block.block;
      let allocatedMemory = 0;

      // Safely handle the allocations array, default to empty if undefined
      const allocations = block.allocations || [];

      allocations.forEach((allocation) => {
        allocatedMemory += allocation.processSize;
      });

      usedMemoryWidth = (allocatedMemory / totalBlockSize) * 100;
      freeMemoryWidth = 100 - usedMemoryWidth;

      return (
        <div key={index} style={{ marginBottom: "20px" }}>
          <div style={{ fontWeight: "bold" }}>
            Memory Block {index + 1} ({block.block} MB):
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid black",
              width: "100%",
              height: "30px",
            }}
          >
            {/* Render allocated memory segments */}
            {allocations.map((allocation, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#37e62e",
                  width: `${(allocation.processSize / block.block) * 100}%`, // Proportional width
                  height: "100%",
                  borderRight:
                    idx < allocations.length - 1 ? "1px solid black" : "none", // Adding border between processes
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "bold",
                    display: "flex", // Enable flexbox
                    justifyContent: "center", // Horizontally center the content
                    alignItems: "center", // Vertically center the content
                    height: "100%", // Ensure the text fills the full height of the div
                    width: "100%", // Ensure the text fills the full width of the div
                  }}
                >
                  {" "}
                  {allocation.processName} ({allocation.processSize} MB){" "}
                </div>
              </div>
            ))}
            {/* Render remaining free memory */}
            <div
              style={{
                backgroundColor: "#f02939",
                width: `${freeMemoryWidth}%`,
                height: "100%",
                borderLeft: "1px solid black",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  display: "flex", // Enable flexbox
                  justifyContent: "center", // Horizontally center the content
                  alignItems: "center", // Vertically center the content
                  height: "100%", // Ensure the text fills the full height of the div
                  width: "100%", // Ensure the text fills the full width of the div
                }}
              >
                {block.remainingSize} MB
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="input-form-container">
      <h1>Worst Fit Algorithm Simulation</h1>

      <div className="input-section">
        <Input processes={processes} setProcesses={setProcesses} />
        <InputBlocks blocks={blocks} setBlocks={setBlocks} />
      </div>

      <div className="button-group">
        <button onClick={allocateWorstFit} className="run-button">
          Run Simulation
        </button>
        <button onClick={clearAll} className="clear-button">
          Clear All
        </button>
      </div>

      <div className="total-list-wrapper">
        <div className="process-list">
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

        <div className="process-list">
          <br />
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
        <br />
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

      {/* Visualization Section for Memory Blocks */}
      <div className="memory-visualization">
        <h2>Memory Blocks Visualization</h2>
        {renderMemoryBlocks()}
      </div>
    </div>
  );
}

export default InputForm;
