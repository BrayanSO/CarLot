import React, { useEffect, useState } from 'react';
import db from './firebase.js';

const MiComponente = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await db.collection('users').get();
      const data = response.docs.map((doc) => doc.data());
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.nombre}</p>
      ))}
    </div>
  );
};

export default MiComponente;
