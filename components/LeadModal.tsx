import React, { useState } from 'react'
import { getOrCreateAnonId } from '../lib/useAnonId'
import { API_ENDPOINTS, UI_STRINGS, ANIMATION_CONFIG } from '../src/config'
import type { Lead } from '../src/types'

export default function LeadModal() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    const anonId = getOrCreateAnonId()

    try {
      const leadData: Lead = {
        name,
        email,
        anonId,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch(API_ENDPOINTS.LEADS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      })

      if (response.ok) {
        setMessage(UI_STRINGS.FORM_SUCCESS)
        setTimeout(() => {
          setOpen(false)
          setName('')
          setEmail('')
          setMessage('')
        }, ANIMATION_CONFIG.BUTTON_CLICK_DURATION)
      } else {
        setMessage(UI_STRINGS.FORM_ERROR)
      }
    } catch (err) {
      setMessage(UI_STRINGS.FORM_ERROR)
      console.error('Form submission error:', err)
    }
    setSending(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen(true)}
        className={`bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded font-semibold transition ${
          open ? 'hidden' : 'block'
        }`}
      >
        {UI_STRINGS.CTA_BUTTON}
      </button>
      {open && (
        <div className="mt-2 bg-white text-black p-6 rounded shadow-xl w-96">
          <h3 className="font-bold text-lg mb-4">{UI_STRINGS.FORM_TITLE}</h3>
          {message ? (
            <p
              className={`font-semibold ${
                message.includes('Gracias')
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {message}
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder={UI_STRINGS.FORM_NAME_PLACEHOLDER}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={UI_STRINGS.FORM_EMAIL_PLACEHOLDER}
                type="email"
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setName('')
                    setEmail('')
                    setMessage('')
                  }}
                  className="px-3 py-1 rounded border"
                >
                  {UI_STRINGS.FORM_CLOSE_BUTTON}
                </button>
                <button
                  disabled={sending}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded disabled:opacity-50"
                >
                  {sending
                    ? UI_STRINGS.FORM_SENDING
                    : UI_STRINGS.FORM_SEND_BUTTON}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
