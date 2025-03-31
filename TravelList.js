// src/TravelList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const TravelList = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      const querySnapshot = await getDocs(collection(db, 'travels'));
      const travelData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTravels(travelData);
    };
    fetchTravels();
  }, []);

  return (
    <div>
      <h2>旅行計画一覧</h2>
      <ul>
        {travels.map((travel) => (
          <li key={travel.id}>
            <h3>{travel.name}</h3>
            <p>開始日: {new Date(travel.startDate.seconds * 1000).toLocaleDateString()}</p>
            <p>終了日: {new Date(travel.endDate.seconds * 1000).toLocaleDateString()}</p>
            <p>予算: ¥{travel.budget}</p>
            <p>日程: {travel.itinerary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelList;
