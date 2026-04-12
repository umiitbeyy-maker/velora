'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'

export default function DemoPage() {
  const params = useParams()
  const slug = params.slug as string
  const [business, setBusiness] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId] = useState(() => Math.random().toString(36).slice(2))
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/businesses')
      .then(r => r.json())
      .then(data => {
        const biz = data.businesses?.find((b: any) => b.slug === slug)
        if (biz) {
          setBusiness(biz)
          setMessages([{
            role: 'assistant',
            content: biz.agent_config?.greeting || `Hi! I am the AI assistant for ${biz.name}. How can I help you?`
          }])
        }
      })
  }, [slug])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId, businessSlug: slug })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    }
    setLoading(false)
  }

  if (!business) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888' }}>Loading...</p>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '16px' }}>
          {business.name[0]}
        </div>
        <div>
          <div style={{ fontWeight: '600', fontSize: '15px' }}>{business.name}</div>
          <div style={{ fontSize: '12px', color: '#a855f7' }}>● AI Agent Active</div>
        </div>
        <a href="/onboarding" style={{ marginLeft: 'auto', fontSize: '13px', color: '#888', textDecoration: 'none', padding: '8px 14px', border: '1px solid #333', borderRadius: '8px' }}>
          + New Business
        </a>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '70%', padding: '12px 16px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6',
              background: msg.role === 'user' ? '#a855f7' : '#1a1a1a',
              color: '#fff'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '12px 16px', background: '#1a1a1a', borderRadius: '12px', color: '#888', fontSize: '14px' }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #1a1a1a', display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Write your message..."
          style={{ flex: 1, padding: '12px 16px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' }}
        />
        <button onClick={send} disabled={loading || !input.trim()}
          style={{ padding: '12px 20px', background: '#a855f7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          Send
        </button>
      </div>
    </div>
  )
}