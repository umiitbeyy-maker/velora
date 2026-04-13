'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function DashboardPage() {
  const params = useParams()
  const slug = params.slug as string
  const [business, setBusiness] = useState<any>(null)
  const [conversations, setConversations] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetch('/api/businesses')
      .then(r => r.json())
      .then(async data => {
        const biz = data.businesses?.find((b: any) => b.slug === slug)
        if (biz) {
          setBusiness(biz)
          const [convRes, apptRes] = await Promise.all([
            fetch(`/api/dashboard/conversations?businessId=${biz.id}`),
            fetch(`/api/dashboard/appointments?businessId=${biz.id}`)
          ])
          const convData = await convRes.json()
          const apptData = await apptRes.json()
          setConversations(convData.conversations || [])
          setAppointments(apptData.appointments || [])
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888' }}>Loading...</p>
    </div>
  )

  const totalMessages = conversations.reduce((sum: number, c: any) => sum + (c.messages?.length || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
          {business?.name?.[0]}
        </div>
        <div>
          <div style={{ fontWeight: '600' }}>{business?.name}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>Admin Dashboard</div>
        </div>
        <a href={`/demo/${slug}`} target="_blank"
          style={{ marginLeft: 'auto', padding: '8px 16px', background: '#a855f7', color: '#fff', borderRadius: '8px', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>
          Open AI Agent →
        </a>
      </div>

      <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          {[
            { label: 'Total Conversations', value: conversations.length, color: '#a855f7' },
            { label: 'Total Messages', value: totalMessages, color: '#3b82f6' },
            { label: 'Appointments', value: appointments.length, color: '#10b981' },
            { label: 'Services', value: business?.services?.length || 0, color: '#f59e0b' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: '#111', borderRadius: '10px', padding: '4px', width: 'fit-content' }}>
          {['overview', 'conversations', 'appointments', 'settings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '500', textTransform: 'capitalize',
                background: activeTab === tab ? '#a855f7' : 'transparent',
                color: activeTab === tab ? '#fff' : '#888' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontWeight: '600', marginBottom: '16px' }}>Recent Conversations</div>
              {conversations.slice(0, 5).map((c: any, i: number) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1a1a1a', fontSize: '13px' }}>
                  <div style={{ color: '#ccc' }}>Session: {c.session_id?.slice(0, 8)}...</div>
                  <div style={{ color: '#888', fontSize: '12px', marginTop: '2px' }}>{c.messages?.length || 0} messages · {new Date(c.updated_at).toLocaleDateString()}</div>
                </div>
              ))}
              {conversations.length === 0 && <p style={{ color: '#555', fontSize: '13px' }}>No conversations yet</p>}
            </div>
            <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontWeight: '600', marginBottom: '16px' }}>Your Services</div>
              {business?.services?.map((s: any, i: number) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#ccc' }}>{s.name}</span>
                  <span style={{ color: '#a855f7' }}>${s.price} · {s.duration}min</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conversations */}
        {activeTab === 'conversations' && (
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontWeight: '600', marginBottom: '16px' }}>All Conversations ({conversations.length})</div>
            {conversations.map((c: any, i: number) => (
              <div key={i} style={{ padding: '14px', marginBottom: '8px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#888' }}>Session: {c.session_id?.slice(0, 12)}...</span>
                  <span style={{ fontSize: '12px', color: '#555' }}>{new Date(c.updated_at).toLocaleString()}</span>
                </div>
                {c.messages?.slice(-2).map((m: any, j: number) => (
                  <div key={j} style={{ fontSize: '13px', padding: '6px 10px', borderRadius: '6px', marginBottom: '4px',
                    background: m.role === 'user' ? '#1a0a2e' : '#1a1a1a',
                    color: m.role === 'user' ? '#c084fc' : '#ccc' }}>
                    <span style={{ fontSize: '11px', color: '#555', marginRight: '6px' }}>{m.role}:</span>
                    {m.content?.slice(0, 100)}{m.content?.length > 100 ? '...' : ''}
                  </div>
                ))}
              </div>
            ))}
            {conversations.length === 0 && <p style={{ color: '#555' }}>No conversations yet. Share your AI agent link to get started!</p>}
          </div>
        )}

        {/* Appointments */}
        {activeTab === 'appointments' && (
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontWeight: '600', marginBottom: '16px' }}>Appointments ({appointments.length})</div>
            {appointments.map((a: any, i: number) => (
              <div key={i} style={{ padding: '14px', marginBottom: '8px', background: '#0a0a0a', borderRadius: '8px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{a.customer_name || 'Unknown'}</div>
                  <div style={{ fontSize: '13px', color: '#888', marginTop: '2px' }}>{a.service} · {a.customer_contact}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '20px', background: a.status === 'confirmed' ? '#052e16' : '#1a0a0a', color: a.status === 'confirmed' ? '#10b981' : '#f59e0b' }}>
                    {a.status}
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>{a.appointment_date ? new Date(a.appointment_date).toLocaleDateString() : 'TBD'}</div>
                </div>
              </div>
            ))}
            {appointments.length === 0 && <p style={{ color: '#555' }}>No appointments yet.</p>}
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontWeight: '600', marginBottom: '16px' }}>Business Settings</div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Business Name</div>
              <div style={{ fontSize: '14px', color: '#fff' }}>{business?.name}</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Industry</div>
              <div style={{ fontSize: '14px', color: '#fff' }}>{business?.industry}</div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Your AI Agent URL</div>
              <div style={{ fontSize: '13px', color: '#a855f7', background: '#1a0a2e', padding: '10px', borderRadius: '8px', fontFamily: 'monospace' }}>
                velora-blond.vercel.app/demo/{slug}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Embed on your website</div>
              <div style={{ fontSize: '12px', color: '#a855f7', background: '#1a0a2e', padding: '10px', borderRadius: '8px', fontFamily: 'monospace' }}>
                {`<script src="https://velora-blond.vercel.app/widget/${slug}.js"></script>`}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}