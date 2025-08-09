import axios from 'axios';
import React, { useState } from 'react';

const Uploadcsv = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/login/upload',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${localStorage.getItem("token")}` 
          }
        }
      );
      setMessage(res.data.message || "File uploaded successfully");
    } catch (error) {
      console.error(error);
      setMessage('Upload failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-md border rounded-md">
      <h2 className="text-xl font-bold mb-4">Upload CSV or Excel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full cursor-pointer"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
    </div>
  );
};

export default Uploadcsv;
