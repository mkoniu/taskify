import React, { useState } from "react";
import { FilePluginController } from "../controllers/PluginController";
import { RecordController } from "../controllers/RecordController";

const FileUploader = ({ task_id }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle processing of the file
  const handleProcessFile = async () => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    // Log the task_id and selected file for demonstration
    console.log("Processing file for task:", task_id);
    console.log("Selected File:", selectedFile);

    let result = await FilePluginController.InsertData({file:selectedFile,ref_id:task_id,ref_type:"tasks"})
    
    

    // Clear the file input
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded shadow-md w-96">
      <label className="block">
        <span className="block text-sm font-medium text-gray-700">Upload File</span>
        <input
          type="file"
          
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs mt-2"
        />
      </label>
      <button
        onClick={handleProcessFile}
        className="btn btn-primary w-full"
      >
        Process File
      </button>
      {selectedFile && (
        <p className="text-sm text-gray-500">Selected File: {selectedFile.name}</p>
      )}
    </div>
  );
};

export default FileUploader;
