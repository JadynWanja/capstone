import React, { useState, useEffect } from 'react';
import { ShieldAlert, Star, Calendar, ArrowUpCircle } from 'lucide-react';

const EligibilityPage = () => {
  const [eligibilityData, setEligibilityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEligibility = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/employees/me/eligibility', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch eligibility data');
        }
        const data = await res.json();
        setEligibilityData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEligibility();
  }, []);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading your records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div style={{ padding: '2rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <ShieldAlert size={48} color="var(--accent-rose)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Access Error</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!eligibilityData) return null;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Star size={28} color="var(--accent-amber)" /> Eligibility & Promotions
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Track your career progression and role changes over time.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        
        {/* Current Status Card */}
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={20} color="var(--accent-cyan)" /> Current Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Employee Code</span>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{eligibilityData.employee?.employee_code}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Position</span>
              <p style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--accent-emerald)' }}>{eligibilityData.employee?.position}</p>
            </div>
          </div>
        </div>

        {/* Promotion History */}
        <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', gridColumn: '1 / -1' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowUpCircle size={20} color="var(--accent-purple)" /> Career History
          </h3>

          {eligibilityData.promotions && eligibilityData.promotions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {eligibilityData.promotions.map((promo, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '1rem', 
                  padding: '1rem', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: 'var(--radius-sm)', 
                  borderLeft: '4px solid var(--accent-purple)'
                }}>
                  <div style={{ padding: '0.5rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '50%', color: 'var(--accent-purple)' }}>
                    <Star size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      Promoted to {promo.new_position}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                      Previous: {promo.old_position}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <Calendar size={12} /> {new Date(promo.promotion_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>You have no recorded promotions or role changes.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EligibilityPage;
