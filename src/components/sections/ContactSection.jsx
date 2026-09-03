import { useState } from 'react';

const THREADS = [
  {
    id: 'new-project',
    avatar: '💼',
    avatarBg: 'rgba(10,132,255,0.12)',
    name: 'New Project Scoping',
    preview: 'Tell us about your robotic challenge...',
    initial: "Hi there! I'm looking to discuss a potential project involving autonomous navigation and ROS2. Do you have bandwidth for a scoping call?",
  },
  {
    id: 'collab',
    avatar: '🔬',
    avatarBg: 'rgba(48,209,88,0.12)',
    name: 'Academic & Joint R&D',
    preview: 'University lab & grant proposals welcome',
    initial: 'We are a university research group interested in collaboration on bio-inspired locomotion. Are joint publications possible?',
  },
  {
    id: 'careers',
    avatar: '🧑‍💻',
    avatarBg: 'rgba(191,90,242,0.12)',
    name: 'Engineering Careers',
    preview: "We're hiring across firmware, robotics & ML",
    initial: "I'm a firmware engineer with 5 years on embedded ARM. I saw your RG-247 platform — are you hiring for hardware teams?",
  },
];

const BOT_REPLIES = [
  "Thanks for reaching out! Our engineering team typically responds within 2 hours. What's the scope of your project?",
  "Great to hear! We do work with universities — could you share your lab's focus area and timeline?",
  "We'd love to chat. Can you share your GitHub or portfolio? We look at real-world embedded projects over resumes.",
];

export default function ContactSection() {
  const [activeThread, setActiveThread] = useState(0);
  const [messages, setMessages] = useState(
    THREADS.map((t, i) => [
      { from: 'them', text: t.initial },
      { from: 'bot', text: BOT_REPLIES[i] },
    ])
  );
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setMessages((prev) => {
      const next = prev.map((thread, i) =>
        i === activeThread ? [...thread, { from: 'me', text: msg }] : thread
      );
      return next;
    });
    setTimeout(() => {
      setMessages((prev) => {
        const next = prev.map((thread, i) =>
          i === activeThread
            ? [...thread, { from: 'bot', text: "Thanks for the message! A team member will pick this up shortly. In the meantime, feel free to email us at hello@robogenesis.co" }]
            : thread
        );
        return next;
      });
    }, 1200);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container-fluid">
        <span className="section-tag">💬 Contact</span>
        <h2 className="section-title">Talk to Our Engineering Team</h2>
        <p className="section-sub">
          Whether you need custom robotic kinematics, embedded firmware, or joint research — let's start the conversation.
        </p>

        <div className="contact-layout">
          {/* Sidebar */}
          <div className="threads-sidebar">
            {THREADS.map((t, i) => (
              <div
                key={t.id}
                className={`thread-item${activeThread === i ? ' active' : ''}`}
                onClick={() => setActiveThread(i)}
              >
                <div className="thread-avatar" style={{ background: t.avatarBg }}>{t.avatar}</div>
                <div>
                  <div className="thread-name">{t.name}</div>
                  <div className="thread-preview">{t.preview}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat */}
          <div className="chat-container">
            <div style={{ padding: '12px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="thread-avatar" style={{ width: 34, height: 34, fontSize: 16, background: THREADS[activeThread].avatarBg }}>
                {THREADS[activeThread].avatar}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{THREADS[activeThread].name}</div>
                <div style={{ fontSize: 12, color: '#30d158', fontWeight: 600 }}>● Online</div>
              </div>
            </div>

            <div className="chat-messages">
              {messages[activeThread].map((m, i) => (
                <div key={i} className={`msg-bubble-wrap${m.from === 'me' ? ' mine' : ''}`}>
                  <div className={`msg-bubble ${m.from === 'me' ? 'mine' : 'theirs'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="chat-input-bar">
              <input
                id="chatInput"
                className="chat-input"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button id="chatSendBtn" className="chat-send-btn" onClick={send}>↑</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
