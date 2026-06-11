import React from 'react';
import { MOCK_STUDENTS, MOCK_GRADES } from '../lib/supabase';
import { Download, Users, FileBarChart, CheckCircle, TrendingUp } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Dashboard = ({ user }: { user: any }) => {
    const generateGeneralReport = () => {
        const doc = new jsPDF();

        // Add Header
        doc.setFillColor(128, 0, 32); // Vinotinto
        doc.rect(0, 0, 210, 40, 'F');

        doc.setTextColor(255, 215, 0); // Yellow
        doc.setFontSize(22);
        doc.text('U.E. Luis Beltrán Prieto Figueroa', 105, 18, { align: 'center' });

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text('Reporte General de Estudiantes', 105, 28, { align: 'center' });
        doc.setFontSize(10);
        doc.text(`Generado por: ${user.name} (${user.role})`, 105, 36, { align: 'center' });

        const tableData = MOCK_STUDENTS.map(s => [
            s.id,
            s.name,
            `${s.grade} "${s.section}"`,
            s.solvent ? 'Solvente' : 'Con Deuda'
        ]);

        (doc as any).autoTable({
            startY: 50,
            head: [['ID', 'Estudiante', 'Grado y Sección', 'Estatus de Solvencia']],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [26, 35, 126], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });

        doc.save('reporte_general.pdf');
    };

    const getStatsTable = () => {
        return (
            <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
                <h3 className="gradient-text-mix" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={24} color="var(--color-navy)" />
                    Resumen Estadístico Institucional
                </h3>

                <div className="grid grid-3">
                    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--color-vinotinto)' }}>
                        <div className="flex-between">
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Total Estudiantes</span>
                            <div style={{ background: 'rgba(128,0,32,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                <Users size={20} color="var(--color-vinotinto-light)" />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-primary)' }}>1,245</h2>
                        <div style={{ fontSize: '0.8rem', color: '#00e676' }}>+5% este lapso</div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--color-navy)' }}>
                        <div className="flex-between">
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Promedio General</span>
                            <div style={{ background: 'rgba(26,35,126,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                <FileBarChart size={20} color="var(--color-navy)" />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-primary)' }}>15.4</h2>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sobre 20 ptos</div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--color-yellow)' }}>
                        <div className="flex-between">
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>Solvencia Administrativa</span>
                            <div style={{ background: 'rgba(255,215,0,0.1)', padding: '0.5rem', borderRadius: '50%' }}>
                                <CheckCircle size={20} color="var(--color-yellow)" />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text-primary)' }}>82%</h2>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-yellow)' }}>Al día con pagos</div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="page-container animate-fade-in">
            <div className="flex-responsive" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 className="gradient-text-vinotinto" style={{ margin: 0 }}>Bienvenido(a), {user.name}</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                        Panel Principal - {new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {['coordinacion', 'administrativo'].includes(user.role) && (
                    <button onClick={generateGeneralReport} className="btn btn-primary" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <Download size={18} />
                        Generar Reporte General PDF
                    </button>
                )}
            </div>

            {user.role === 'representante' && (
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>Estado de mis Representados</h2>
                    <div className="grid grid-2">
                        {MOCK_STUDENTS.filter(s => s.representativeId === user.id).map(student => (
                            <div key={student.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="flex-between">
                                    <h3 style={{ margin: 0, color: 'var(--color-yellow)', fontSize: '1.25rem' }}>{student.name}</h3>
                                    {student.solvent ? (
                                        <span className="badge badge-success">Solvente</span>
                                    ) : (
                                        <span className="badge badge-danger">Deuda</span>
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Grado: {student.grade} - {student.section}</span>
                                </div>
                                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {['coordinacion', 'administrativo'].includes(user.role) && getStatsTable()}
        </div>
    );
};

export default Dashboard;
