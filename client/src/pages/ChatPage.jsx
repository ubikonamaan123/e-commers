import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { http } from '../api/http';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { token, user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const socketRef = useRef(null);

  const loadConversations = async () => {
    const res = await http.get('/chats');
    setConversations(res.data);
  };

  useEffect(() => {
    if (!token) return;
    loadConversations();
    socketRef.current = io('http://localhost:5000', { auth: { token } });
    socketRef.current.on('chat:message', ({ conversationId, message }) => {
      if (conversationId === active?.id) {
        setMessages((prev) => [...prev, message]);
      }
    });
    return () => socketRef.current?.disconnect();
  }, [token, active?.id]);

  const createSupportChat = async () => {
    const users = await http.get('/auth/me');
    const res = await http.post('/chats', {
      topic: 'Support Request',
      participantIds: [users.data.id]
    });
    setConversations((prev) => [...prev, res.data]);
  };

  const openConversation = async (conv) => {
    setActive(conv);
    const res = await http.get(`/chats/${conv.id}/messages`);
    setMessages(res.data);
    socketRef.current?.emit('chat:join', conv.id);
  };

  const send = () => {
    if (!text || !active) return;
    socketRef.current.emit('chat:send', { conversationId: active.id, text });
    setText('');
  };

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 12 }}>
      <aside>
        <h4>Conversations</h4>
        <button onClick={createSupportChat}>New Conversation</button>
        {conversations.map((c) => (
          <div key={c.id}>
            <button onClick={() => openConversation(c)}>{c.topic}</button>
          </div>
        ))}
      </aside>
      <div>
        <h4>{active?.topic || 'Select a conversation'}</h4>
        <div style={{ minHeight: 200, border: '1px solid #ddd', padding: 8 }}>
          {messages.map((m) => (
            <p key={m.id}><b>{m.senderId === user?.id ? 'You' : 'Other'}:</b> {m.text}</p>
          ))}
        </div>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type message" />
        <button onClick={send}>Send</button>
      </div>
    </section>
  );
}
