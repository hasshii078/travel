// src/TravelForm.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const TravelForm = () => {
  // フォームの状態管理
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('');
  const [itinerary, setItinerary] = useState('');

  // フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Firestore にデータを追加
    try {
      await addDoc(collection(db, 'travels'), {
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseFloat(budget),  // 予算は数値として保存
        itinerary
      });
      alert('旅行計画が追加されました!');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('計画の追加に失敗しました');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>旅行名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="旅行名を入力"
        />
      </div>
      <div>
        <label>開始日</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>終了日</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>予算</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="予算を入力"
        />
      </div>
      <div>
        <label>日程</label>
        <textarea
          value={itinerary}
          onChange={(e) => setItinerary(e.target.value)}
          placeholder="旅行の日程を入力"
        />
      </div>
      <button type="submit">計画を追加</button>
    </form>
  );
};

export default TravelForm;
