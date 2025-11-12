import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import type { Lead, APIResponse } from '../../src/types'

const DATA_PATH = path.join(process.cwd(), 'data', 'leads.json')

interface LeadWithTimestamp extends Lead {
  _receivedAt: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body as Lead

    // Validate required fields
    if (!body.email || !body.name || !body.anonId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, name, anonId',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
      })
    }

    const now = new Date().toISOString()
    const entry: LeadWithTimestamp = {
      ...body,
      _receivedAt: now,
    }

    let arr: LeadWithTimestamp[] = []
    try {
      const raw = fs.readFileSync(DATA_PATH, 'utf-8')
      arr = JSON.parse(raw || '[]')
    } catch (e) {
      arr = []
    }

    arr.push(entry)
    fs.writeFileSync(DATA_PATH, JSON.stringify(arr, null, 2))

    return res.status(201).json({
      success: true,
      data: entry,
    })
  } catch (e) {
    console.error('Error saving lead:', e)
    return res.status(500).json({
      success: false,
      error: 'Failed to save lead',
    })
  }
}
