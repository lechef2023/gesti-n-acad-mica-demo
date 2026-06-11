import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../lib/supabase';
import { CreditCard, Search, Edit3, X, Check } from 'lucide-react';

const Solvencias = ({ user }: { user: any }) => {
    const [students, setStudents] = useState(MOCK_STUDENTS);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSolvency = (id: string) => {
        setStudents(prev => prev.map(s => s.id === id ? { ...s, solvent: !s.solvent } : s));
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container animate-fade-in">
            <h1 className="gradient-text-vinotinto">Gestión de Solvencias</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Administre y actualice el estatus de pagos administrativos del alumnado.</p>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div className="flex-responsive" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ color: 'var(--color-yellow)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CreditCard size={24} /> Estatus Administrativo
                    </h2>
                    <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Buscar estudiante o grado..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID Estudiante</th>
                                <th>Nombre Completo</th>
                                <th>Grado y Sección</th>
                                <th>Estatus Actual</th>
                                <th style={{ textAlign: 'center' }}>Acción (Cambiar Estado)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td style={{ color: 'var(--text-secondary)' }}>#{student.id.toUpperCase()}</td>
                                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                                    <td>{student.grade} "{student.section}"</td>
                                    <td>
                                        {student.solvent ? (
                                            <span className="badge badge-success">Solvente</span>
                                        ) : (
                                            <span className="badge badge-danger">Con Deuda</span>
                                        )}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            onClick={() => toggleSolvency(student.id)}
                                            className="btn btn-secondary"
                                            style={{
                                                padding: '0.4rem 0.75rem',
                                                fontSize: '0.8rem',
                                                borderColor: student.solvent ? '#ff5252' : '#00e676',
                                                color: student.solvent ? '#ff5252' : '#00e676'
                                            }}
                                        >
                                            {student.solvent ? (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <X size={14} /> Marcar Deuda
                                                </span>
                                            ) : (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                    <Check size={14} /> Marcar Solvente
                                                </span>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                                        No se encontraron resultados para la búsqueda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Solvencias;
