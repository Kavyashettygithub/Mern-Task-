import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.clear();


    navigate("/");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
      Logging out...
    </div>
  );
};

export default Logout;
