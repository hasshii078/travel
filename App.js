import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PlacesList from './PlacesList';
import Map from './Map';
import TravelForm from './TravelForm';
import TravelList from './TravelList';
import './App.css';
import JapanMap from "./JapanMap"; // 日本地図コンポーネントをインポート

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>一人旅の備忘録</h1>
          <nav>
            <ul>
              <li><Link to="/">ホーム</Link></li>
              <li><Link to="/visited-places">行ったことがある県</Link></li> {/* 訪問履歴ページのリンク名を変更 */}
              <li><Link to="/places">行きたい場所</Link></li>
              <li><Link to="/map">地図</Link></li>
              <li><Link to="/TravelForm">旅行計画入力</Link></li>
              <li><Link to="/TravelList">旅行計画リスト</Link></li>
              
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visited-places" element={<JapanMap />} /> {/* 訪問履歴ページのパスを変更 */}
            <Route path="/places" element={<PlacesList />} />
            <Route path="/map" element={<Map />} />
            <Route path="/TravelForm" element={<TravelForm />} />
            <Route path="/TravelList" element={<TravelList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h2>ようこそ！</h2>
    <p>一人旅の備忘録アプリへようこそ。行きたい場所をメモしたり、地図で確認したりできます。</p>
    <p>メニューから「行きたい場所」や「地図」を確認して、旅行の計画を立てましょう。</p>
  </div>
);

export default App;
