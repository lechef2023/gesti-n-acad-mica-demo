import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_GRADES } from '../lib/supabase';
import { BookOpen, Award, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MisNotas = ({ user }: { user: any }) => {
    const myStudents = MOCK_STUDENTS.filter(s => s.representativeId === user.id);
    const [selectedStudent, setSelectedStudent] = useState(myStudents[0]?.id || null);

    const generatePDF = (student: any) => {
        if (!student.solvent) {
            alert("El estudiante presenta deuda administrativa. No se puede emitir el boletín.");
            return;
        }
        const doc = new jsPDF();

        doc.setFillColor(128, 0, 32);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 215, 0);
        doc.setFontSize(22);
        doc.text('U.E. Luis Beltrán Prieto Figueroa', 105, 18, { align: 'center' });
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text('Boletín de Notas', 105, 28, { align: 'center' });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Estudiante: ${student.name}`, 14, 50);
        doc.text(`Grado/Sección: ${student.grade} - "${student.section}"`, 14, 58);
        doc.text(`Representante: ${user.name}`, 14, 66);

        const tableData = MOCK_GRADES.map(g => [g.subject, g.period, g.score]);

        (doc as any).autoTable({
            startY: 75,
            head: [['Asignatura', 'Lapso', 'Calificación (0-20)']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [26, 35, 126] },
        });

        doc.save(`boletin_${student.name.replace(/ /g, '_')}.pdf`);
    };

    return (
        <div className="page-container animate-fade-in">
            <h1 className="gradient-text-vinotinto" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>Boletín de Calificaciones</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Consulte las notas y genere reportes por cada representado.</p>

            {myStudents.length === 0 ? (
                <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                    No tiene estudiantes asignados.
                </div>
            ) : (
                <>
                    {/* Selector de representados: horizontal scroll en móvil, columna lateral en desktop */}
                    <div className="student-selector-bar">
                        {myStudents.map(student => (
                            <button
                                key={student.id}
                                onClick={() => setSelectedStudent(student.id)}
                                className={`student-tab-btn ${selectedStudent === student.id ? 'active' : ''}`}
                            >
                                <div style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{student.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                                    {student.grade} "{student.section}"
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Contenido de notas */}
                    {selectedStudent && (() => {
                        const student = myStudents.find(s => s.id === selectedStudent);
                        if (!student) return null;

                        return (
                            <div className="glass-panel" style={{ padding: 'clamp(1rem, 3vw, 2rem)', marginTop: '1rem' }}>
                                {/* Cabecera del panel de notas */}
                                <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <h2 style={{ color: 'var(--color-yellow)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', flexWrap: 'wrap' }}>
                                            <BookOpen size={22} />
                                            {student.name}
                                        </h2>
                                        <div style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontSize: '0.875rem' }}>
                                            Registro Académico • {student.grade} "{student.section}"
                                        </div>
                                    </div>

                                    {student.solvent ? (
                                        <button className="btn btn-primary" onClick={() => generatePDF(student)} style={{ width: '100%', maxWidth: '280px' }}>
                                            Descargar Boletín PDF
                                        </button>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff5252', background: 'rgba(255, 82, 82, 0.1)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 82, 82, 0.3)', flexWrap: 'wrap' }}>
                                            <AlertCircle size={18} style={{ flexShrink: 0 }} />
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Solvencia Requerida para emitir el boletín</span>
                                        </div>
                                    )}
                                </div>

                                {/* Tabla de notas */}
                                <div className="table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Asignatura</th>
                                                <th>Período</th>
                                                <th>Calificación</th>
                                                <th>Estatus</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_GRADES.map((grade, i) => (
                                                <tr key={i}>
                                                    <td style={{ fontWeight: 500 }}>{grade.subject}</td>
                                                    <td>{grade.period}</td>
                                                    <td>
                                                        <div style={{
                                                            display: 'inline-block',
                                                            width: '30px',
                                                            height: '30px',
                                                            lineHeight: '30px',
                                                            textAlign: 'center',
                                                            borderRadius: '50%',
                                                            background: grade.score >= 10 ? 'rgba(0, 200, 83, 0.2)' : 'rgba(255, 82, 82, 0.2)',
                                                            color: grade.score >= 10 ? '#00e676' : '#ff5252',
                                                            fontWeight: 'bold'
                                                        }}>
                                                            {grade.score}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {grade.score >= 10 ? (
                                                            <span className="badge badge-success">Aprobado</span>
                                                        ) : (
                                                            <span className="badge badge-danger">Reprobado</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Promedio general */}
                                <div className="glass-card" style={{ marginTop: '1.5rem', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(26, 35, 126, 0.2)', border: '1px solid rgba(26, 35, 126, 0.4)' }}>
                                    <Award size={28} color="var(--color-yellow)" style={{ flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Promedio General del Período</div>
                                        <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>16.75 <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/ 20 pts</span></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </>
            )}
        </div>
    );
};

export default MisNotas;
