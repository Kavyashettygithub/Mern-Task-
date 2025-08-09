import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewTasks = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view tasks.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/login/getFile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.error) {
          setError(res.data.message || "Failed to fetch task lists.");
        } else {
          setAgents(res.data.data || []);
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Distributed Task Lists</h2>

      {agents.length === 0 ? (
        <p className="text-gray-600">No tasks distributed yet.</p>
      ) : (
        agents.map((agent) => (
          <div key={agent._id || Math.random()} className="mb-8 border-b pb-4">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">
              Agent:{" "}
              {agent.agentId?.name
                ? `${agent.agentId.name} (${agent.agentId.email || "No email"})`
                : "Unknown Agent"}
            </h3>

            {agent.items?.length > 0 ? (
              <ul className="list-disc pl-5">
                {agent.items.map((item, index) => (
                  <li key={index} className="mb-2">
                    <strong>{item.firstName || "N/A"}</strong> –{" "}
                    {item.phone || "No phone"}
                    <br />
                    <em className="text-gray-600">
                      {item.notes || "No notes"}
                    </em>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No items assigned to this agent.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewTasks;
