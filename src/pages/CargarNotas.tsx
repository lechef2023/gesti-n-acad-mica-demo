import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../lib/supabase';
import { Save, Users, CheckCircle } from 'lucide-react';

const CargarNotas = ({ user }: { user: any }) => {
    const sections = ['3er Año "A"', '4to Año "B"'];
    const [selectedSection, setSelectedSection] = useState(sections[0]);
    const [isSaved, setIsSaved] = useState(false);
    const [grades, setGrades] = useState<{ [key: string]: string }>({});

    const handleGradeChange = (studentId: string, value: string) => {
        setGrades(prev => ({ ...prev, [studentId]: value }));
        setIsSaved(false);
    };

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const currentStudents = MOCK_STUDENTS.filter(s => `${s.grade} "${s.section}"` === selectedSection);

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem' }}>
            <h1 className="gradient-text-vinotinto">Carga Calificaciones</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Seleccione la sección y asigne las notas correspondientes.</p>

            <div className="grid grid-3">
                <div className="glass-panel" style={{ padding: '1.5rem', gridColumn: 'span 1' }}>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={20} /> Mis Secciones
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {sections.map(section => (
                            <button
                                key={section}
                                onClick={() => setSelectedSection(section)}
                                style={{
                                    padding: '1rem',
                                    textAlign: 'left',
                                    background: selectedSection === section ? 'rgba(128, 0, 32, 0.2)' : 'transparent',
                                    border: selectedSection === section ? '1px solid var(--color-vinotinto-light)' : '1px solid var(--border-subtle)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontWeight: 600 }}>{section}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Física • Lapso 1</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', gridColumn: 'span 2' }}>
                    <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ color: 'var(--color-yellow)', margin: 0 }}>Listado de {selectedSection}</h2>
                        {isSaved && (
                            <span style={{ color: '#00e676', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                                <CheckCircle size={18} /> Notas Guardadas
                            </span>
                        )}
                    </div>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Estudiante</th>
                                <th>Calificación Final</th>
                                <th>Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudents.map(student => (
                                <tr key={student.id}>
                                    <td style={{ fontWeight: 500 }}>{student.name}</td>
                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            className="form-input"
                                            style={{ width: '80px', textAlign: 'center' }}
                                            value={grades[student.id] || ''}
                                            onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                            placeholder="--"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Opcional..."
                                        />
                                    </td>
                                </tr>
                            ))}
                            {currentStudents.length === 0 && (
                                <tr>
                                    <td colSpan={3} style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                                        No hay estudiantes registrados en esta sección.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn btn-primary" onClick={handleSave} disabled={currentStudents.length === 0}>
                            <Save size={18} /> Guardar Calificaciones
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CargarNotas;
