import { useState } from "react";

const PopupForm = ({ onSubmit }) => {
  const [memo, setMemo] = useState("");

  return (
    <div className="popup-form">
      <h3>メモを入力</h3>
      <input
        type="text"
        placeholder="ここでメモを入力"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button onClick={() => onSubmit(memo)}>追加</button>
    </div>
  );
};

export default PopupForm;
