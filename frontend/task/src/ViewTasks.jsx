import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTasks = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/login/getFile").then((res) => {
      if (!res.data.error) {
        setAgents(res.data.data);
      }
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Distributed Task Lists</h2>
      {agents.map((agent) => (
        <div key={agent.agentId} className="mb-8 border-b pb-4">
          <h3 className="text-xl font-semibold mb-2 text-blue-700">Agent {agent.agentId}</h3>
          <ul className="list-disc pl-5">
            {agent.items.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>{item.firstName}</strong> – {item.phone}
                <br />
                <em className="text-gray-600">{item.notes}</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewTasks;
