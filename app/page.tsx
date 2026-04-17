'use client'
import { useRouter } from 'next/navigation'

export default function LandingPage() {
  const router = useRouter()
  return (
    <div style={{ minHeight: '100vh', background: '#06060a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: '22px', fontWeight: '800', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Velora</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => router.push('/demo/glamour-beauty')} style={{ padding: '9px 20px', background: 'transparent', color: '#999', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', fontSize: '14px', cursor: 'pointer' }}>Live Demo</button>
          <button onClick={() => router.push('/onboarding')} style={{ padding: '9px 22px', background: 'linear-gradient(135deg, #9333ea, #ec4899)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Get Started Free →</button>
        </div>
      </nav>
      <div style={{ textAlign: 'center', padding: '120px 24px 80px' }}>
        <h1 style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: '800', lineHeight: '1.06', letterSpacing: '-3px', marginBottom: '28px' }}>
          Your business,{' '}
          <span style={{ background: 'linear-gradient(135deg, #c084fc 0%, #f472b6 50%, #fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>always on.</span>
        </h1>
        <p style={{ fontSize: '18px', color: '#666', maxWidth: '500px', margin: '0 auto 48px', lineHeight: '1.75' }}>Give your business an AI agent that talks to customers, books appointments, and closes deals — around the clock, in any language.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '48px' }}>
          <button onClick={() => router.push('/onboarding')} style={{ padding: '15px 40px', background: 'linear-gradient(135deg, #9333ea, #ec4899)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Launch My AI Agent →</button>
          <button onClick={() => router.push('/demo/glamour-beauty')} style={{ padding: '15px 36px', background: 'rgba(255,255,255,0.04)', color: '#ccc', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '16px', cursor: 'pointer' }}>▶ Watch it work</button>
        </div>
      </div>
      <div style={{ textAlign: 'center', padding: '100px 24px' }}>
        <h2 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-2px', marginBottom: '16px' }}>Your AI agent is waiting.</h2>
        <p style={{ color: '#555', fontSize: '17px', marginBottom: '44px' }}>2 minutes from now, your business never sleeps.</p>
        <button onClick={() => router.push('/onboarding')} style={{ padding: '18px 60px', background: 'linear-gradient(135deg, #9333ea, #ec4899)', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '18px', fontWeight: '800', cursor: 'pointer' }}>Launch My AI Agent →</button>
      </div>
      <div style={{ textAlign: 'center', padding: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#333', fontSize: '13px' }}>© 2025 Velora · AI Agent Platform</div>
    </div>
  )
}
