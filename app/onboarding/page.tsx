'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const industries = [
  { value: 'beauty_salon', label: '💅 Beauty Salon' },
  { value: 'restaurant', label: '🍽️ Restaurant' },
  { value: 'clinic', label: '🏥 Clinic' },
  { value: 'construction', label: '🏗️ Construction' },
  { value: 'retail', label: '🛍️ Retail Store' },
  { value: 'fitness', label: '💪 Gym / Fitness' },
  { value: 'hotel', label: '🏨 Hotel' },
  { value: 'other', label: '🏢 Other' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    industry: '',
    description: '',
    language: 'en',
    services: [{ name: '', price: '', duration: '' }],
  })

  const updateForm = (field: string, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const updateService = (i: number, field: string, value: string) => {
    const updated = [...form.services]
    updated[i] = { ...updated[i], [field]: value }
    setForm(prev => ({ ...prev, services: updated }))
  }

  const addService = () =>
    setForm(prev => ({ ...prev, services: [...prev.services, { name: '', price: '', duration: '' }] }))

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          industry: form.industry,
          description: form.description,
          language: form.language,
          services: form.services.filter(s => s.name).map(s => ({
            name: s.name,
            price: Number(s.price),
            duration: Number(s.duration)
          }))
        })
      })
      const data = await res.json()
      if (data.business && data.business.slug) {
        window.location.href = `/demo/${data.business.slug}`
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Velora</div>
          <p style={{ color: '#888', fontSize: '15px' }}>Set up your AI agent in 2 minutes</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ width: '32px', height: '4px', borderRadius: '2px', background: step >= n ? '#a855f7' : '#333' }} />
            ))}
          </div>
        </div>

        {error && <div style={{ background: '#2a0a0a', border: '1px solid #f87171', borderRadius: '8px', padding: '12px', marginBottom: '16px', color: '#f87171', fontSize: '13px' }}>{error}</div>}

        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Tell us about your business</h2>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Business Name</label>
              <input value={form.name} onChange={e => updateForm('name', e.target.value)}
                placeholder="e.g. Glamour Beauty Salon"
                style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Industry</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {industries.map(ind => (
                  <div key={ind.value} onClick={() => updateForm('industry', ind.value)}
                    style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
                      border: form.industry === ind.value ? '1px solid #a855f7' : '1px solid #333',
                      background: form.industry === ind.value ? '#1a0a2e' : '#1a1a1a',
                      color: form.industry === ind.value ? '#a855f7' : '#ccc' }}>
                    {ind.label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', color: '#888', display: 'block', marginBottom: '6px' }}>Short Description</label>
              <textarea value={form.description} onChange={e => updateForm('description', e.target.value)}
                placeholder="e.g. Premium beauty salon in downtown..."
                rows={3}
                style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', resize: 'none', boxSizing: 'border-box' }} />
            </div>
            <button onClick={() => setStep(2)} disabled={!form.name || !form.industry}
              style={{ width: '100%', padding: '14px', background: form.name && form.industry ? '#a855f7' : '#333', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: form.name && form.industry ? 'pointer' : 'not-allowed', fontFamily: 'inherit' }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Add your services</h2>
            {form.services.map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginBottom: '10px' }}>
                <input value={s.name} onChange={e => updateService(i, 'name', e.target.value)} placeholder="Service name"
                  style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }} />
                <input value={s.price} onChange={e => updateService(i, 'price', e.target.value)} placeholder="Price $"
                  style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }} />
                <input value={s.duration} onChange={e => updateService(i, 'duration', e.target.value)} placeholder="Min"
                  style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '13px' }} />
              </div>
            ))}
            <button onClick={addService}
              style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px dashed #444', borderRadius: '8px', color: '#888', fontSize: '13px', cursor: 'pointer', marginBottom: '24px', fontFamily: 'inherit' }}>
              + Add service
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)}
                style={{ flex: 1, padding: '14px', background: '#1a1a1a', color: '#ccc', border: '1px solid #333', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
              <button onClick={() => setStep(3)}
                style={{ flex: 2, padding: '14px', background: '#a855f7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>Continue →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Ready to launch! 🚀</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Your AI agent will be live instantly</p>
            <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#888', fontSize: '12px' }}>Business</span>
                <p style={{ color: '#fff', fontWeight: '600', margin: '4px 0 0' }}>{form.name}</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#888', fontSize: '12px' }}>Industry</span>
                <p style={{ color: '#fff', margin: '4px 0 0' }}>{industries.find(i => i.value === form.industry)?.label}</p>
              </div>
              <div>
                <span style={{ color: '#888', fontSize: '12px' }}>Services</span>
                <p style={{ color: '#fff', margin: '4px 0 0' }}>{form.services.filter(s => s.name).length} services added</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(2)}
                style={{ flex: 1, padding: '14px', background: '#1a1a1a', color: '#ccc', border: '1px solid #333', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
              <button onClick={handleSubmit} disabled={loading}
                style={{ flex: 2, padding: '14px', background: '#a855f7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
                {loading ? 'Creating...' : 'Launch my AI Agent 🚀'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
