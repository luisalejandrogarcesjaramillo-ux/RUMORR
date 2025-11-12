/**
 * @jest-environment node
 */
import { POST } from './route';
import { NextRequest } from 'next/server';

// Mock de la librería Supabase
const mockInsert = jest.fn();
const mockFrom = jest.fn(() => ({ insert: mockInsert }));

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: (tableName: string) => mockFrom(tableName),
  },
}));

describe('API Route: /api/leads', () => {
  // Limpiar mocks después de cada test
  beforeEach(() => {
    mockInsert.mockClear();
    mockFrom.mockClear();
  });

  it('debería retornar 201 y un mensaje de éxito con un email válido', async () => {
    const validEmail = 'neo@rumor.red';
    mockInsert.mockResolvedValueOnce({ error: null });

    const req = new NextRequest('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({ email: validEmail }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.message).toBe('Lead created successfully');
    expect(mockFrom).toHaveBeenCalledWith('leads');
    expect(mockInsert).toHaveBeenCalledWith({ email: validEmail });
  });

  it('debería retornar 400 si el email es inválido', async () => {
    const req = new NextRequest('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({ email: 'not-an-email' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toContain('Invalid email');
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('debería retornar 409 si el email ya existe (error de constraint único)', async () => {
    // Simulamos un error de Supabase para una constraint de unicidad
    mockInsert.mockResolvedValueOnce({ error: { code: '23505' } });

    const req = new NextRequest('http://localhost/api/leads', {
      method: 'POST',
      body: JSON.stringify({ email: 'exists@rumor.red' }),
    });

    const response = await POST(req);
    const body = await response.json();

    expect(response.status).toBe(409);
    expect(body.error).toBe('Email already exists');
  });
});