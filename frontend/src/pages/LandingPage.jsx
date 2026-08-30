import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Calendar,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Heart,
  Zap,
  Award
} from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      {/* Navigation Bar */}
      <header
        style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(6, 9, 19, 0.85)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="logo-badge">CH</div>
          <span className="logo-text" style={{ fontSize: '1.4rem' }}>Cadre Hub</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/login?tab=login')}>
            Sign In
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/login?tab=register')}>
            Join Our Team <ArrowRight size={18} />
          </button>
        </div>
      </header>

      {/* Hero Section with Office Background Image */}
      <section
        style={{
          position: 'relative',
          padding: '7.5rem 2rem 5.5rem',
          width: '100%',
          backgroundImage: `linear-gradient(180deg, rgba(6, 9, 19, 0.82) 0%, rgba(6, 9, 19, 0.96) 100%), url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderBottom: '1px solid var(--border-color)',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '3.75rem',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Great Things in Business Are Never Done by One Person. They Are Done by a <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Team</span>.
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Welcome to <strong>Cadre Hub</strong> — where passion meets collaboration. We bring your team together in one seamless workspace, simplifying workflows, celebrating milestones, and inspiring everyone to reach their highest potential.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '4.5rem' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem', fontWeight: 700 }} onClick={() => navigate('/login?tab=register')}>
              Start Working Together <ArrowRight size={20} />
            </button>
            <button className="btn btn-secondary" style={{ padding: '1rem 2.25rem', fontSize: '1.05rem' }} onClick={() => navigate('/login?tab=login')}>
              Sign In to Workspace
            </button>
          </div>

          {/* Feature Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div className="stat-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)', marginBottom: '1.25rem' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Connected Team Directory</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Build meaningful connections. Know who’s who, celebrate team talents, and bridge departments with transparent organization profiles.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div className="stat-icon" style={{ background: 'rgba(0, 242, 254, 0.15)', color: 'var(--accent-cyan)', marginBottom: '1.25rem' }}>
                <Calendar size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Balanced Rest & Leave</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Support team well-being. Easy time-off requests, transparent leave balances, and swift manager approvals so everyone returns energized.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', marginBottom: '1.25rem' }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Synchronized Daily Rhythm</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Stay in sync effortlessly. Track daily shift clockings and work hours so your entire team moves in perfect harmony every day.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div className="stat-icon" style={{ background: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-rose)', marginBottom: '1.25rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Trust & Mutual Respect</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                Work with confidence. Role-based permissions and complete audit transparency keep team data safe, secure, and respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Spirit Encouragement Banner */}
      <section style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', padding: '4rem 2rem', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <Heart size={32} color="var(--accent-rose)" />
            <Zap size={32} color="var(--accent-cyan)" />
            <Award size={32} color="var(--accent-indigo)" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            "Alone we can do so little; together we can do so much."
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            At Cadre Hub, every voice is heard, every effort is valued, and every goal is won together as one unified team.
          </p>
        </div>
      </section>

      {/* Role Capabilities Section */}
      <section style={{ background: 'var(--bg-secondary)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.75rem' }}>Empowering Every Role in the Team</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Tailored tools so each team member can focus on what they do best</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <span className="badge badge-admin" style={{ marginBottom: '1rem' }}>ADMIN</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Visionary Leader</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Full workspace oversight & growth</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Department & role alignment</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> System transparency & audit logging</li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <span className="badge badge-hr" style={{ marginBottom: '1rem' }}>HR STAFF</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>People Operations</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Smooth onboarding & employee care</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Fair leave & balance management</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Transparent reporting & insights</li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <span className="badge badge-manager" style={{ marginBottom: '1rem' }}>MANAGER</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Team Leader</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Supportive leave approvals</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Team availability calendar</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Fostering collaboration & trust</li>
              </ul>
            </div>

            <div className="glass-card" style={{ padding: '1.75rem' }}>
              <span className="badge badge-employee" style={{ marginBottom: '1rem' }}>EMPLOYEE</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Team Contributor</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Personal profile ownership</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Easy leave booking & balance tracking</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><CheckCircle2 size={16} color="var(--accent-emerald)" /> Simple daily shift clocking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '2.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} Cadre Hub. Built for teams working together towards excellence.
      </footer>
    </div>
  );
};

export default LandingPage;
