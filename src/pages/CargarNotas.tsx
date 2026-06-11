import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../lib/supabase';
import { Save, Users, CheckCircle, BookOpen } from 'lucide-react';

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
        <div className="page-container animate-fade-in">
            <h1 className="gradient-text-vinotinto" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Carga Calificaciones</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Seleccione la sección y asigne las notas correspondientes.</p>

            {/* Selector de secciones: tabs horizontales scrollables */}
            <div className="student-selector-bar" style={{ marginBottom: '1.25rem' }}>
                {sections.map(section => (
                    <button
                        key={section}
                        onClick={() => setSelectedSection(section)}
                        className={`student-tab-btn ${selectedSection === section ? 'active' : ''}`}
                    >
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{section}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Física • Lapso 1</div>
                    </button>
                ))}
            </div>

            {/* Panel de ingreso de notas */}
            <div className="glass-panel" style={{ padding: 'clamp(1rem, 3vw, 2rem)' }}>
                {/* Cabecera */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <h2 style={{ color: 'var(--color-yellow)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'clamp(1rem, 4vw, 1.4rem)' }}>
                        <BookOpen size={20} /> {selectedSection}
                    </h2>
                    {isSaved && (
                        <span style={{ color: '#00e676', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
                            <CheckCircle size={18} /> Notas Guardadas
                        </span>
                    )}
                </div>

                {/* Vista tabla para desktop, tarjetas para móvil */}
                {currentStudents.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                        No hay estudiantes registrados en esta sección.
                    </div>
                ) : (
                    <>
                        {/* TABLA — visible solo en desktop (≥ 600px) */}
                        <div className="table-container notas-table-desktop">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Estudiante</th>
                                        <th>Calificación Final (0–20)</th>
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
                                </tbody>
                            </table>
                        </div>

                        {/* TARJETAS — visibles solo en móvil (< 600px) */}
                        <div className="notas-cards-mobile">
                            {currentStudents.map((student, idx) => (
                                <div
                                    key={student.id}
                                    className="glass-card"
                                    style={{
                                        padding: '1rem 1.25rem',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.75rem',
                                        borderLeft: '3px solid var(--color-vinotinto)',
                                        marginBottom: idx < currentStudents.length - 1 ? '0.75rem' : 0
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                            {student.name}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '99px' }}>
                                            {selectedSection}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '0 0 auto' }}>
                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Calificación (0–20)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="20"
                                                className="form-input"
                                                style={{ width: '90px', textAlign: 'center', fontSize: '1.1rem', fontWeight: 700, padding: '0.6rem' }}
                                                value={grades[student.id] || ''}
                                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                                placeholder="--"
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1, minWidth: '120px' }}>
                                            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Observaciones</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                placeholder="Opcional..."
                                                style={{ padding: '0.6rem 0.75rem' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* Botón guardar */}
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={currentStudents.length === 0}
                        style={{ width: '100%', maxWidth: '240px' }}
                    >
                        <Save size={18} /> Guardar Calificaciones
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargarNotas;
