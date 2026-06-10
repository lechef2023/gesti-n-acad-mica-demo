import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../lib/supabase';
import { Users, Search, UserPlus, FileEdit } from 'lucide-react';

const Estudiantes = ({ user }: { user: any }) => {
    const [students, setStudents] = useState(MOCK_STUDENTS);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem' }}>
            <h1 className="gradient-text-vinotinto">Directorio de Estudiantes</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Registro unificado de la matrícula estudiantil de la institución.</p>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <h2 style={{ color: 'var(--color-yellow)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={24} /> Matrícula General
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ position: 'relative', width: '250px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Buscar por nombre, ID o grado..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
                            <UserPlus size={18} /> Inscribir Nuevo Alumno
                        </button>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID Matrícula</th>
                            <th>Apellidos y Nombres</th>
                            <th>Grado</th>
                            <th>Sección</th>
                            <th>ID Representante</th>
                            <th style={{ textAlign: 'center' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td style={{ color: 'var(--text-secondary)' }}>#MLB-{student.id.toUpperCase()}</td>
                                <td style={{ fontWeight: 600 }}>{student.name}</td>
                                <td>{student.grade}</td>
                                <td>"{student.section}"</td>
                                <td>REP-{student.representativeId}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <FileEdit size={14} /> Ver/Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredStudents.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                                    No se encontraron resultados para la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Estudiantes;
