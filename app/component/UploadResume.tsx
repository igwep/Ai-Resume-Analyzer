"use client";
import React, {useState} from 'react'

interface UploadResumeProps {
  onResult: (output: string) => void;
}

const UploadResume = ({onResult}: UploadResumeProps ) => {
    const [loading, setLoading] = useState(false);
    const [resume, setResume] = useState<File | null>(null);
    const [jobDesc, setJobDesc] = useState('');

   const handleUpload = async () => {
  if (!resume || !jobDesc) {
    alert('Please upload a resume and enter a job description.');
    return;
  }

  const formData = new FormData();
  formData.append('resume', resume);
  formData.append('jobDesc', jobDesc);
  setLoading(true);

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      body: formData,
    });

    const responseText = await res.text(); // read once

    let data;
    try {
      data = JSON.parse(responseText); // try to parse as JSON
    } catch {
      console.error('Non-JSON response from server:', responseText);
      throw new Error('Server did not return JSON');
    }

    setLoading(false);

    if (res.ok && data?.suggestions) {
      onResult(data.suggestions);
    } else {
      alert(data?.error || 'No suggestions found. Please try again.');
    }

  } catch (error) {
    console.error('Error uploading resume:', error);
    alert('Failed to analyze resume. Please try again.');
    setLoading(false);
  }
};

    
  return (
    
    <div className="space-y-4 p-4 bg-white text-black shadow rounded">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setResume(e.target.files?.[0] || null)}
      />
      <textarea
        className="w-full h-40 text-black border p-2"
        placeholder="Paste the job description here..."
         value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)} 
      />
      <button
        className="bg-blue-600 text-black px-4 py-2 rounded"
         onClick={handleUpload} 
        disabled={loading} 
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>
    </div>
  )
}

export default UploadResume