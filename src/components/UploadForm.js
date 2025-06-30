import React, { useState } from 'react';
import './UploadForm.css';

const UploadForm = ({ setLink, setIsUploading }) => {
  const [file, setFile] = useState(null);
  const [expiry, setExpiry] = useState("");
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('expiry', expiry);
    if (usePassword) formData.append('password', password);

    try {
      const res = await fetch('https://3ect839oc7.execute-api.ap-south-1.amazonaws.com/dev/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setLink(`http://secure-file-store-adithya.s3-website.ap-south-1.amazonaws.com/download/${data.id}`);
    } catch (err) {
      alert("Upload failed!");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <div className="drop-zone">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <p>Drag & drop files or click to browse</p>
      </div>

      <div className="form-group">
        <label>Link expiry:</label>
        <select value={expiry} onChange={(e) => setExpiry(e.target.value)}>
          <option value="">Select</option>
          <option value={5}>10 minutes</option>
          <option value={30}>30 minutes</option>
          <option value={60}>1 hour</option>
          <option value={1440}>1 day</option>
          <option value={10080}>1 week</option>
        </select>
      </div>

      <div className="password-group">
  <label>
    <input 
      type="checkbox" 
      checked={usePassword}
      onChange={() => setUsePassword(!usePassword)}
    />
    Enable Password Protection
  </label>

  {usePassword && (
    <>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Set password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label style={{ display: "block", marginTop: "5px" }}>
        <input 
          type="checkbox" 
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />
        &nbsp;Show password
      </label>
    </>
  )}
</div>


      <button type="submit" className="upload-btn">
        Upload & Generate Link
      </button>
    </form>
  );
};

export default UploadForm;