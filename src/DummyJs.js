import React, { useState, useEffect } from 'react';
import './AdminPages/AdminStyle.scss'
function DummyJs() {
  const [loading, setLoading] = useState(true);


  return (
    <div>
      {loading ? (
        <div className='loader'>
          
        </div>
      ) : (
        <h1>Data Loaded!</h1>
      )}
    </div>
  );
}

export default DummyJs;
