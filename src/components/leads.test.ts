import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './leads';
import { APIResponse } from '../../src/types';

// Mock del cliente de Supabase
const mockInsert = jest.fn();
jest.mock('../../src/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: mockInsert,
    })),
  },
}));

describe('API Route: /api/leads', () => {
  let req: Partial<NextApiRequest>;
  let res: Partial<NextApiResponse>;
  let status: jest.Mock;
  let json: jest.Mock;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock de la respuesta de Next.js
    json = jest.fn();
    status = jest.fn(() => ({ json }));
    res = {
      status,
    } as Partial<NextApiResponse<APIResponse>>;
  });

  it('debería retornar 201 y guardar el lead si el email es válido', async () => {
    mockInsert.mockResolvedValue({ error: null });
    req = {
      method: 'POST',
      body: { email: 'neo@rumor.red', name: 'Neo', anonId: 'test-id' },
    };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      data: { message: 'Lead created successfully' },
    }));
    expect(mockInsert).toHaveBeenCalledWith([{ email: 'neo@rumor.red', name: 'Neo', anonId: 'test-id' }]);
  });

  it('debería retornar 400 si el email es inválido', async () => {
    req = {
      method: 'POST',
      body: { email: 'not-an-email', name: 'Trinity', anonId: 'test-id' },
    };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith({
      success: false,
      error: 'Invalid email format',
    });
    expect(mockInsert).not.toHaveBeenCalled();
  });

  it('debería retornar 409 si el email ya existe', async () => {
    mockInsert.mockResolvedValue({ error: { code: '23505' } }); // Código de error de unicidad de PostgreSQL
    req = { method: 'POST', body: { email: 'exists@rumor.red', name: 'Agent Smith', anonId: 'test-id-2' } };

    await handler(req as NextApiRequest, res as NextApiResponse);

    expect(status).toHaveBeenCalledWith(409);
    expect(json).toHaveBeenCalledWith({ success: false, error: 'Email already exists' });
  });
});