import React, { useState, useEffect } from "react";
import japanMap from "./japan-map.svg"; // 日本地図のSVGファイルを用意
import "./JapanMap.css"; // スタイル用のCSS

const JapanMap = () => {
  const [visitedPrefectures, setVisitedPrefectures] = useState(() => {
    return JSON.parse(localStorage.getItem("visitedPrefectures")) || [];
  });

  useEffect(() => {
    localStorage.setItem("visitedPrefectures", JSON.stringify(visitedPrefectures));
  }, [visitedPrefectures]);

  useEffect(() => {
    const svgObject = document.getElementById("japan-map-svg");

    const handleLoad = () => {
      const svgDoc = svgObject.contentDocument;
      if (svgDoc) {
        // すでに訪問した都道府県を色で表示
        visitedPrefectures.forEach((pref) => {
          const element = svgDoc.getElementById(pref);
          if (element) {
            element.style.fill = "#007bff"; // 訪問済みの都道府県を青色に
          }
        });

        // クリックイベントの設定
        svgDoc.addEventListener("click", (e) => {
          const clickedElement = e.target.closest("g"); // 親の<g>タグを取得
          if (clickedElement && clickedElement.id) {
            togglePrefecture(clickedElement.id);
          }
        });
      }
    };

    svgObject.addEventListener("load", handleLoad);

    return () => {
      svgObject.removeEventListener("load", handleLoad);
    };
  }, [visitedPrefectures]);

  const togglePrefecture = (prefecture) => {
    setVisitedPrefectures((prev) => {
      const isVisited = prev.includes(prefecture);
      const updatedPrefectures = isVisited
        ? prev.filter((p) => p !== prefecture)
        : [...prev, prefecture];

      // SVGの色を更新
      const svgObject = document.getElementById("japan-map-svg");
      const svgDoc = svgObject?.contentDocument;
      if (svgDoc) {
        const element = svgDoc.getElementById(prefecture);
        if (element) {
          element.style.fill = isVisited ? "#EEEEEE" : "#007bff"; // 訪問済みなら元の色、未訪問なら青
        }
      }

      return updatedPrefectures;
    });
  };

  return (
    <div className="japan-map-container">
      <h2>訪れた都道府県をクリック！</h2>
      <object
        id="japan-map-svg"
        type="image/svg+xml"
        data={japanMap}
        className="japan-map"
        aria-label="日本の地図"
      />
    </div>
  );
};

export default JapanMap;