import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { db, collection, addDoc, getDocs } from "./firebase"; // Firestore 追加
import L from "leaflet";

const Map = () => {
  const [markers, setMarkers] = useState([]);

  // Firestore からピンを取得
  const fetchMarkers = async () => {
    const querySnapshot = await getDocs(collection(db, "places"));
    const loadedMarkers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMarkers(loadedMarkers);
  };

  // カスタムアイコンを作成
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png", // 好きなアイコンに変更
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

  // マップクリックでピンを追加
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        const memo = prompt("メモを入力してください："); // ユーザーにメモ入力

        if (memo) {
          const newMarker = { lat, lng, memo };

          // Firestore に保存
          const docRef = await addDoc(collection(db, "places"), newMarker);
          setMarkers([...markers, { id: docRef.id, ...newMarker }]);
        }
      },
    });
    return null;
  };

  return (
    <MapContainer center={[35.6812, 139.7671]} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
/>

      <MapClickHandler />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
        <Popup>{marker.memo}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
