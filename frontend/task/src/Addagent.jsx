import React, { useState } from 'react'
import axios from 'axios'

const Addagent = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
  e.preventDefault();
  const mobno = `${countryCode}${phoneNumber}`;
  const token = localStorage.getItem("token");

  if (!token) {
    setError("You must be logged in to register an agent.");
    setMessage(null);
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:3000/api/login/agentRegister",
      { name, email, mobno, password },
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send JWT token
        },
      }
    );

    if (res.data.error) {
      setError(res.data.message);
      setMessage(null);
    } else {
      setMessage("Agent registered successfully!");
      setError(null);
      // Clear form
      setName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setCountryCode("+91");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong.");
    setMessage(null);
  }

  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg border rounded-md">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add Agent</h1>
    {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input type="text" className="w-full border px-3 py-2 rounded" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input type="email" className="w-full border px-3 py-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Mobile Number</label>
          <div className="flex gap-2">
            <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="border px-2 py-2 rounded">
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+81">🇯🇵 +81</option>
             
            </select>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full border px-3 py-2 rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input type="password" className="w-full border px-3 py-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Addagent
