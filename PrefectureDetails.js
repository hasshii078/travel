import React, { useState, useEffect } from "react";
import "./PrefectureDetails.css";

const categories = ["場所", "グルメ", "その他"];

const PrefectureDetails = ({ prefecture, goBack }) => {
  const defaultPlaces = { 場所: [], グルメ: [], その他: [] };

  const [places, setPlaces] = useState(() => {
    const savedData = localStorage.getItem(`places-${prefecture}`);
    return savedData ? JSON.parse(savedData) : defaultPlaces;
  });

  const [newPlace, setNewPlace] = useState({ name: "", url: "", image: "", category: "場所" });

  useEffect(() => {
    localStorage.setItem(`places-${prefecture}`, JSON.stringify(places));
  }, [places, prefecture]);

  const addPlace = () => {
    if (newPlace.name.trim() === "") return;
    setPlaces((prev) => ({
      ...prev,
      [newPlace.category]: [...(prev[newPlace.category] || []), newPlace],
    }));
    setNewPlace({ name: "", url: "", image: "", category: "場所" });
  };

  const removePlace = (category, index) => {
    setPlaces((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="prefecture-details-container">
      <h2>{prefecture} の気になるスポット・グルメ</h2>
      <button onClick={goBack} className="back-button">戻る</button>

      {/* ⭐ 入力フォーム */}
      <div className="input-container">
        <select value={newPlace.category} onChange={(e) => setNewPlace({ ...newPlace, category: e.target.value })}>
          {categories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <input type="text" placeholder="名前" value={newPlace.name} onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })} />
        <input type="text" placeholder="URL (任意)" value={newPlace.url} onChange={(e) => setNewPlace({ ...newPlace, url: e.target.value })} />
        <input type="text" placeholder="画像URL (任意)" value={newPlace.image} onChange={(e) => setNewPlace({ ...newPlace, image: e.target.value })} />
        <button onClick={addPlace} className="add-button">追加</button>
      </div>

      {/* ⭐ カテゴリーごとに横並びレイアウト */}
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category} className="category-box">
            <h3>{category}</h3>
            <ul className="places-list">
              {(places[category] || []).map((place, index) => (
                <li key={index} className="place-item">
                  <div>
                    <strong>{place.name}</strong>
                    {place.url && <a href={place.url} target="_blank" rel="noopener noreferrer">[リンク]</a>}
                    {place.image && <img src={place.image} alt={place.name} className="place-image" />}
                  </div>
                  <button onClick={() => removePlace(category, index)} className="delete-button">削除</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrefectureDetails;
