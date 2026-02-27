import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Admin Panel — Harold Portfolio',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', zIndex: 0 }}>
      {/* Dark fixed bg for admin */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: 'linear-gradient(135deg,#050505 0%,#0f0800 50%,#050505 100%)',
      }} />
      {/* Orange glow */}
      <div style={{
        position: 'fixed', top: '-20%', right: '-10%',
        width: '50vw', height: '50vw', borderRadius: '50%', zIndex: -1,
        background: 'radial-gradient(circle,rgba(249,115,22,0.09) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  );
}

