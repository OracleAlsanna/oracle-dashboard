import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { getAnalyticsSummary, getRecentClicks } from '../api.js';
import './AnalyticsPanel.css';

export default function AnalyticsPanel({ onClose, style }) {
  const [summary, setSummary] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [summaryData, recentData] = await Promise.all([
          getAnalyticsSummary(),
          getRecentClicks(),
        ]);
        if (cancelled) return;
        setSummary(summaryData);
        setRecent(recentData);
      } catch (_) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const chartData = [...summary]
    .sort((a, b) => b.click_count - a.click_count)
    .slice(0, 5)
    .map((l) => ({ code: l.code, clicks: l.click_count }));

  return (
    <div className="popout-panel popout-wide" style={style}>
      <div className="popout-header">
        <span className="popout-title">analytics</span>
        <button className="popout-close" onClick={onClose}>×</button>
      </div>
      <div className="analytics-body">
        {loading && <p className="analytics-status">loading...</p>}
        {!loading && error && (
          <p className="analytics-status">
            could not reach the analytics api. is the backend running?
          </p>
        )}
        {!loading && !error && chartData.length === 0 && (
          <p className="analytics-status">no clicks recorded yet.</p>
        )}
        {!loading && !error && chartData.length > 0 && (
          <>
            <p className="analytics-label">top links by clicks</p>
            <div className="analytics-chart">
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={chartData}>
                  <XAxis dataKey="code" stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} width={24} />
                  <Tooltip
                    cursor={{ fill: 'rgba(197, 134, 192, 0.08)' }}
                    contentStyle={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: 6, fontSize: 12 }}
                    labelStyle={{ color: 'var(--text)' }}
                    itemStyle={{ color: 'var(--accent)' }}
                    wrapperStyle={{ outline: 'none' }}
                  />
                  <Bar dataKey="clicks" fill="var(--accent)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
        {!loading && !error && recent.length > 0 && (
          <>
            <p className="analytics-label">recent clicks</p>
            <ul className="analytics-recent">
              {recent.slice(0, 5).map((c, i) => (
                <li key={i} className="analytics-recent-item">
                  <span className="analytics-recent-code">{c.code}</span>
                  <span className="analytics-recent-ref">{c.referrer || 'direct'}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
