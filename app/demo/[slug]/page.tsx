'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  const [activeIndustry, setActiveIndustry] = useState(0)
  const [visible, setVisible] = useState(false)
  const [typed, setTyped] = useState('')
  const [msgIndex, setMsgIndex] = useState(0)

  const industries = [
    { icon: '💅', name: 'Beauty Salon', color: '#f472b6', msg: 'Hi! I want to book a hair treatment for Saturday', reply: 'Of course! We have 10:00 AM and 2:30 PM available on Saturday. Which do you prefer? I can also tell you about our new keratin package 💇‍♀️' },
    { icon: '🍽️', name: 'Restaurant', color: '#fb923c', msg: 'Do you have a table for 4 on Friday evening?', reply: 'Yes! Friday at 7:30 PM works perfectly for a table of 4. Shall I note any dietary preferences or special occasion? 🥂' },
    { icon: '🏥', name: 'Clinic', color: '#34d399', msg: 'I need to see a dermatologist this week', reply: 'Dr. Sarah has openings on Wednesday at 11 AM and Thursday at 3 PM. Would you like me to send a confirmation to your email? 🩺' },
    { icon: '🏗️', name: 'Construction', color: '#60a5fa', msg: 'Can I get a quote for a kitchen renovation?', reply: 'Absolutely! Our team is available for a free site visit Mon–Sat. Could you share the approximate area in m² and your preferred timeline? 🔨' },
    { icon: '🏨', name: 'Hotel', color: '#a78bfa', msg: 'Any rooms available for 3 nights next weekend?', reply: 'Yes! We have a Deluxe King available at $129/night. Includes breakfast and spa access. Want me to reserve it for you? 🏨' },
    { icon: '💪', name: 'Gym', color: '#facc15', msg: 'What personal training packages do you offer?', reply: 'We have 3 tiers: Starter (8 sessions), Pro (16 sessions with nutrition plan), and Elite (unlimited + recovery). Which fits your goals best? 💪' },
  ]

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  useEffect(() => {
    const ind = industries[activeIndustry]
    setTyped('')
    setMsgIndex(0)
    let i = 0
    const interval = setInterval(() => {
      if (i <= ind.msg.length) {
        setTyped(ind.msg.slice(0, i))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setMsgIndex(1), 600)
      }
    }, 38)
    return () => clearInterval(interval)
  }, [activeIndustry])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndustry(prev => (prev + 1) % industries.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const ind = industries[activeIndustry]

  return (
    <div style={{
      minHeight: '100vh',
      background: '#06060a',
      color: '#fff',
      fontFamily: "'DM Sans', 'SF Pro Display', system-ui, sans-serif",
      overflowX: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .fade-up { opacity: 0; transform: translateY(32px); transition: all 0.9s cubic-bezier(0.16,1,0.3,1); }
        .fade-up.show { opacity: 1; transform: translateY(0); }
        .industry-btn { transition: all 0.25s ease; }
        .industry-btn:hover { transform: translateY(-2px); }
        .glow-btn { transition: all 0.3s ease; }
        .glow-btn:hover { transform: translateY(-2px); box-shadow: 0 20px 60px rgba(168,85,247,0.5) !important; }
        .ghost-btn:hover { background: rgba(255,255,255,0.08) !important; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{opacity:0.4} 50%{opacity:1} 100%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation: blink 1s infinite; }
        .float { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(236,72,153,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Navbar */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '18px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Velora</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="ghost-btn" onClick={() => router.push('/demo/glamour-beauty')}
            style={{ padding: '9px 20px', background: 'transparent', color: '#999', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
            Live Demo
          </button>
          <button className="glow-btn" onClick={() => router.push('/onboarding')}
            style={{ padding: '9px 22px', background: 'linear-gradient(135deg, #9333ea, #ec4899)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 8px 32px rgba(147,51,234,0.35)' }}>
            Get Started Free →
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '100px 24px 60px' }}>
        <div className={`fade-up ${visible ? 'show' : ''}`} style={{ transitionDelay: '0.1s' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px 5px 6px', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: '20px', fontSize: '13px', color: '#c084fc', marginBottom: '36px' }}>
            <span style={{ background: '#9333ea', borderRadius: '12px', padding: '2px 10px', fontSize: '11px', fontWeight: '700', color: '#fff' }}>NEW</span>
            AI Agents for every business on the planet
          </div>
        </div>

        <div className={`fade-up ${visible ? 'show' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <h1 style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: '800', lineHeight: '1.06', letterSpacing: '-3px', marginBottom: '28px', maxWidth: '880px', margin: '0 auto 28px' }}>
            Your business,{' '}
            <span style={{ background: 'linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              always on.
            </span>
          </h1>
        </div>

        <div className={`fade-up ${visible ? 'show' : ''}`} style={{ transitionDelay: '0.3s' }}>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '500px', margin: '0 auto 48px', lineHeight: '1.75', fontWeight: '400' }}>
            Give your business an AI agent that talks to customers, books appointments, and closes deals — around the clock, in any language.
          </p>
        </div>

        <div className={`fade-up ${visible ? 'show' : ''}`} style={{ transitionDelay: '0.4s', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}>
          <button className="glow-btn" onClick={() => router.push('/onboarding')}
            style={{ padding: '15px 40px', background: 'linear-gradient(135deg, #9333ea, #ec4899)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 12px 40px rgba(147,51,234,0.4)' }}>
            Launch My AI Agent →
          </button>
          <button className="ghost-btn" onClick={() => router.push('/demo/glamour-beauty')}
            style={{ padding: '15px 36px', background: 'rgba(255,255,255,0.04)', color: '#ccc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '16px', cursor: 'pointer', fontFamily: 'inherit' }}>
            ▶ Watch it work
          </button>
        </div>

        <div style={{ display: 'flex', gap: '28px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['Free to start', 'No credit card', '2-min setup', 'Any language'].map((t, i) => (
            <span key={i} style={{ fontSize: '13px', color: '#444', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#9333ea', fontSize: '15px' }}>✓</span> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Live Demo Block */}
      <div style={{ position: 'relative', zIndex: 1, padding: '20px 24px 80px', maxWidth: '860px', margin: '0 auto' }}>
        {/* Industry selector */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          {industries.map((ind, i) => (
            <button key={i} className="industry-btn"
              onClick={() => setActiveIndustry(i)}
              style={{
                padding: '8px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', fontFamily: 'inherit',
                background: activeIndustry === i ? ind.color + '22' : 'rgba(255,255,255,0.04)',
                color: activeIndustry === i ? ind.color : '#666',
                outline: activeIndustry === i ? `1px solid ${ind.color}55` : '1px solid transparent',
              }}>
              {ind.icon} {ind.name}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
          {/* Chat header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: ind.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              {ind.icon}
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{ind.name} AI Agent</div>
              <div style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'shimmer 2s infinite' }} />
                <span style={{ color: '#34d399' }}>Online — powered by Velora</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ padding: '24px 20px', minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Agent greeting */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: ind.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{ind.icon}</div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px 14px 14px 4px', padding: '12px 16px', fontSize: '14px', color: '#ccc', maxWidth: '70%', lineHeight: '1.6' }}>
                Hello! 👋 I'm the AI assistant for <strong style={{ color: '#fff' }}>{ind.name}</strong>. How can I help you today?
              </div>
            </div>

            {/* User message typing */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ background: `linear-gradient(135deg, #9333ea, #ec4899)`, borderRadius: '14px 14px 4px 14px', padding: '12px 16px', fontSize: '14px', color: '#fff', maxWidth: '70%', lineHeight: '1.6', minHeight: '44px' }}>
                {typed}<span className="blink" style={{ display: typed === ind.msg ? 'none' : 'inline' }}>|</span>
              </div>
            </div>

            {/* AI reply */}
            {msgIndex === 1 && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: ind.color + '33', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{ind.icon}</div>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px 14px 14px 4px', padding: '12px 16px', fontSize: '14px', color: '#ccc', maxWidth: '72%', lineHeight: '1.6' }}>
                  {ind.reply}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ position: 'relative', zIndex: 1, padding: '60px 40px', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[
            { value: '2 min', label: 'Average setup time' },
            { value: '24/7', label: 'Agent availability' },
            { value: '∞', label: 'Businesses supported' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-2px', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <div style={{ fontSize: '14px', color: '#555', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ position: 'relative', zIndex: 1, padding: '80px 40px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#444', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px' }}>Features</p>
        <h2 style={{ textAlign: 'center', fontSize: '40px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '56px' }}>Built for real business</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {[
            { icon: '🧠', title: 'Llama 3.3 70B', desc: 'World-class AI that understands nuance, context, and your customers' },
            { icon: '⚡', title: '2-Minute Launch', desc: 'No developers. No complexity. Your AI agent is live before your coffee cools.' },
            { icon: '🌍', title: 'Any Language', desc: 'Your customer writes in Azerbaijani, Russian, Arabic — AI responds perfectly.' },
            { icon: '📅', title: 'Auto Booking', desc: 'AI captures name, contact, service, and time — fills your calendar automatically.' },
            { icon: '📊', title: 'Live Dashboard', desc: 'Every conversation, appointment, and insight visible in real time.' },
            { icon: '🔗', title: 'One-Line Embed', desc: 'Paste one script tag. Your AI agent appears on any website instantly.' },
          ].map((f, i) => (
            <div key={i} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
              <div style={{ fontSize: '22px', marginBottom: '14px' }}>{f.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px', color: '#f0f0f0' }}>{f.title}</div>
              <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.7' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '100px 24px 120px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(139,92,246,0.1), transparent)', pointerEvents: 'none' }} />
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: '800', letterSpacing: '-2px', marginBottom: '16px' }}>
          Your AI agent is waiting.
        </h2>
        <p style={{ color: '#555', fontSize: '17px', marginBottom: '44px' }}>2 minutes from now, your business never sleeps.</p>
        <button className="glow-btn" onClick={() => router.push('/onboarding')}
          style={{ padding: '18px 60px', background: 'linear-gradient(135deg, #9333ea, #ec4899)', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '18px', fontWeight: '800', cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 16px 60px rgba(147,51,234,0.5)', letterSpacing: '-0.3px' }}>
          Launch My AI Agent →
        </button>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#333', fontSize: '13px' }}>
        © 2025 Velora · AI Agent Platform
      </div>
    </div>
  )
}