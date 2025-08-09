import React, { useEffect, useState } from 'react';

const AgentDashboard = () => {
  const [data, setData] = useState([]);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', mobno: '', password: '' });

  const token = localStorage.getItem("token");

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login/getAgents", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const result = await res.json();
      if (!result.error) {
        setData(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const deleteAgent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/login/deleteAgent/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await res.json();
      if (!result.error) {
        getData();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  const startEdit = (agent) => {
    setEditingAgent(agent._id);
    setForm({
      name: agent.name,
      email: agent.email,
      mobno: agent.mobno,
      password: ''
    });
  };

  const updateAgent = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/login/updateAgent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (!result.error) {
        setEditingAgent(null);
        getData();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating agent:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Agent Dashboard</h2>
      {data.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {data.map(agent => (
            <div key={agent._id} style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}>
              {editingAgent === agent._id ? (
                <>
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Mobile"
                    value={form.mobno}
                    onChange={e => setForm({ ...form, mobno: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="New Password (optional)"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <button onClick={() => updateAgent(agent._id)}>Save</button>
                    <button onClick={() => setEditingAgent(null)} style={{ marginLeft: "8px" }}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{agent.name}</h3>
                  <p>Email: {agent.email}</p>
                  <p>Mobile: {agent.mobno}</p>
                  <div>
                    <button onClick={() => startEdit(agent)} style={{ marginLeft: "8px", color: "black",cursor:"pointer" }}>Edit</button>
                    <button
                      onClick={() => deleteAgent(agent._id)}
                      style={{ marginLeft: "8px", color: "black",cursor:"pointer" }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No agents found.</p>
      )}
    </div>
  );
};

export default AgentDashboard;
