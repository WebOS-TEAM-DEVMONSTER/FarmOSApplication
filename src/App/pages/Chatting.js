import React, { useState } from 'react';
import Nav from './components/CommunityNav'; // 기존 Nav 컴포넌트
import ChattingCss from './css/Chatting.module.less';

function Chatting() {
  const [messages, setMessages] = useState([
    { text: "that looks so good!", sender: "other" },
    { text: "or we could make this?", sender: "me" }
  ]);

  const [input, setInput] = useState(""); // 입력 필드 상태 관리

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "me" }]);
      setInput(""); // 전송 후 입력 필드 초기화
    }
  };

  return (
    <div className={ChattingCss.pageContainer}>
      <Nav />
      <div className={ChattingCss.chatContent}>
        <div className={ChattingCss.chatHeader}>
          <p>Name</p>
        </div>
        <div className={ChattingCss.chatWindow}>
          {messages.map((message, index) => (
            <p key={index} className={message.sender === "me" ? ChattingCss.me : ChattingCss.other}>
              {message.text}
            </p>
          ))}
        </div>
        <div className={ChattingCss.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Input"
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatting;
