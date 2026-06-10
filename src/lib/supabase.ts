import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://mock-url.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'mock-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// --- Dummy Data & Types for Demo Mode Since no DB is connected ---
export type Role = 'representante' | 'profesor' | 'administrativo' | 'coordinacion';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export const DUMMY_USERS: User[] = [
  { id: '1', name: 'Ana García', email: 'ana@rep.com', role: 'representante' },
  { id: '2', name: 'Prof. Pedro León', email: 'pedro@prof.com', role: 'profesor' },
  { id: '3', name: 'Admin. Rosa', email: 'rosa@admin.com', role: 'administrativo' },
  { id: '4', name: 'Coord. Miguel', email: 'miguel@coord.com', role: 'coordinacion' },
];

export const MOCK_STUDENTS = [
  { id: 's1', name: 'Carlos García', grade: '3er Año', section: 'A', representativeId: '1', solvent: true },
  { id: 's2', name: 'María López', grade: '4to Año', section: 'B', representativeId: '1', solvent: false },
];

export const MOCK_GRADES = [
  { subject: 'Matemáticas', score: 18, period: 'Lapso 1' },
  { subject: 'Física', score: 16, period: 'Lapso 1' },
  { subject: 'Química', score: 19, period: 'Lapso 1' },
  { subject: 'Inglés', score: 14, period: 'Lapso 1' },
];

export const getMockUser = (email: string) => DUMMY_USERS.find(u => u.email === email) || DUMMY_USERS[0];
