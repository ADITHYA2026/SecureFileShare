import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DownloadFile.css';

const DownloadFile = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('checking');
  const [password, setPassword] = useState('');
  const [downloadData, setDownloadData] = useState(null);

  const verifyPassword = async () => {
    try {
      const res = await fetch(`https://3ect839oc7.execute-api.ap-south-1.amazonaws.com/dev/download/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        const data = await res.json();
        setDownloadData(data);
        setStatus('verified');
      } else {
        setStatus('wrong_password');
      }
    } catch {
      setStatus('error');
    }
  };

  useEffect(() => {
    // Check if file requires password
    fetch(`https://3ect839oc7.execute-api.ap-south-1.amazonaws.com/dev/check/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.protected) setStatus('checking');
        else setStatus('verified');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'checking') return (
    <div className="password-prompt">
      <h3>🔒 Password Required</h3>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={verifyPassword}>Continue</button>
    </div>
  );

  if (status === 'wrong_password') return (
    <div className="password-prompt error">
      <h3>❌ Incorrect Password</h3>
      <input
        type="password"
        placeholder="Try again"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={verifyPassword}>Retry</button>
    </div>
  );

  if (status === 'error') return <p>Error loading file</p>;

  return (
    <div className="download-container">
      <h3>Your file is ready!</h3>
      <a 
        href={downloadData?.url}  // Added optional chaining
        download
        className="download-btn"
      >
        Download File
      </a>
    </div>
  );
};

export default DownloadFile;