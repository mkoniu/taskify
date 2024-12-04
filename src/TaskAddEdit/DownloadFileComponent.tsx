import React, { useState, useEffect } from "react";
import { FilePluginController } from "../controllers/PluginController";

const FileListDownloader = ({ file_id }:{file_id:number}) => {
  const [fileRecords, setFileRecords] = useState([]);

  // Fetch file records when the component mounts
  useEffect(() => {
    const fetchFileRecords = async () => {
      try {
        // Assuming GetRecords returns a Promise
        const records = await FilePluginController.GetRecords({collectionName:"file_storage",
            filter:"ref_type = 'tasks' and ref_id = " + file_id
        });
        setFileRecords(records.data);
      } catch (error) {
        console.error("Error fetching file records:", error);
      }
    };

    fetchFileRecords();
  }, [file_id]);

  // Handle file download
  const handleDownload = async (fileId, fileName) => {
    try {
      // Fetch the blob using GetFile
      const fileBlob = await FilePluginController.GetFile(fileId);

      // Create a download link and trigger download
      const url = window.URL.createObjectURL(fileBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(`Error downloading file with ID ${fileId}:`, error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md w-full max-w-2xl mx-auto">
      <h1 className="text-lg font-bold mb-4">File List</h1>
      <div className="overflow-auto">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Name</th>
              <th className="text-right p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fileRecords.length > 0 ? (
              fileRecords.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="p-2">{record.id}</td>
                  <td className="p-2">{record.name}</td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => handleDownload(record.id, record.name)}
                      className="btn btn-secondary btn-sm"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center text-gray-500">
                  No files available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileListDownloader;
