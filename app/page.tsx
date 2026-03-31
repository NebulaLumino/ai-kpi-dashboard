'use client';

import { useState } from 'react';

const ACCENT = 'hsl(255, 70%, 60%)';
const SYSTEM_PROMPT = `You are an expert program evaluation and nonprofit performance management specialist. Generate a comprehensive logic model with SMART KPIs and dashboard structure based on the user's program information.

Include ALL of the following in clean markdown:

# PROGRAM LOGIC MODEL & KPI DASHBOARD FRAMEWORK

## Executive Summary
Overview of the program's theory of change, key KPIs, and dashboard structure.

## Program Logic Model
A complete, detailed logic model table:
| Inputs | Activities | Outputs | Short-Term Outcomes | Medium-Term Outcomes | Long-Term Outcomes |
With specific, realistic entries based on the user's program description.

## SMART KPI Framework
SMART KPIs (Specific, Measurable, Achievable, Relevant, Time-bound) organized by outcome level:

### Output KPIs
Quantitative metrics for program delivery:
- Participant volume KPIs
- Service delivery KPIs
- Program reach KPIs

### Short-Term Outcome KPIs (0-12 months)
Early change metrics:
- Knowledge/skill acquisition KPIs
- Attitude/awareness KPIs
- Behavior initiation KPIs

### Medium-Term Outcome KPIs (1-3 years)
Sustained change metrics:
- Behavior maintenance KPIs
- Condition change KPIs
- Systemic change indicators

### Long-Term Outcome KPIs (3-5+ years)
Ultimate impact metrics aligned with mission.

## KPI Data Dictionary
For each KPI include:
| KPI Name | Definition | Calculation | Data Source | Collection Frequency | Responsible Party | Target |

## KPI Tracking Dashboard Structure
Framework for a KPI dashboard including:
- Recommended dashboard format (what to include)
- Key dashboard sections:
  - Program Overview (at-a-glance metrics)
  - Output Metrics (monthly delivery)
  - Outcome Progress (trend analysis)
  - Equity Lens (disaggregation by demographic)
  - Comparison to targets and benchmarks

## Data Visualization Recommendations
Types of charts/visualizations best suited for each KPI type:
- Line charts for trends over time
- Bar charts for comparisons
- Gauge/progress charts for targets
- Heat maps for geographic or demographic breakdowns

## Data Collection Systems
Recommendations for:
- How to collect KPI data
- Recommended tools (free and paid)
- Data quality assurance process
- Reporting cadence

## Benchmarking Strategy
How to set meaningful KPI targets including:
- Baseline determination
- Peer comparison data
- Trend-based projections

Make KPIs specific, measurable, and practical for nonprofit data capacity.`;

export default function KPIDashboardPage() {
  const [orgName, setOrgName] = useState('');
  const [program, setProgram] = useState('');
  const [activities, setActivities] = useState('');
  const [outcomes, setOutcomes] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Organization: ${orgName}\nProgram: ${program}\nProgram Activities: ${activities}\nDesired Outcomes: ${outcomes}\n\nGenerate a logic model with SMART KPIs and dashboard framework.`,
          systemPrompt: SYSTEM_PROMPT,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOutput(data.output);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold" style={{ background: ACCENT }}>📈</div>
          <div>
            <h1 className="font-bold text-lg">KPI Dashboard & Logic Model Builder</h1>
            <p className="text-xs text-gray-400">SMART KPIs, Logic Models & Dashboard Structure</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Build Your KPI Framework</h2>
          <p className="text-gray-400">Describe program activities and desired outcomes — get a logic model with SMART KPIs and a framework for KPI tracking and dashboard structure.</p>
        </div>
        <form onSubmit={handleGenerate} className="space-y-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Organization Name</label>
              <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="e.g. Career Pathways Network"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': ACCENT } as React.CSSProperties} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Program Name</label>
              <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} placeholder="e.g. Youth Career Exploration Program"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': ACCENT } as React.CSSProperties} required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Program Activities — What does your program do?</label>
            <textarea value={activities} onChange={(e) => setActivities(e.target.value)} placeholder="Describe program activities: e.g. 8-week career exploration workshops, paid internships with local employers, one-on-one career coaching, job placement assistance, 6-month post-placement support..."
              rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none"
              style={{ '--tw-ring-color': ACCENT } as React.CSSProperties} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Desired Outcomes — What change do you want to see in participants?</label>
            <textarea value={outcomes} onChange={(e) => setOutcomes(e.target.value)} placeholder="Describe expected outcomes: e.g. Participants gain career awareness and job skills, obtain employment in their field of interest, maintain employment for 6+ months, earn a living wage, progress in their career over time..."
              rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 resize-none"
              style={{ '--tw-ring-color': ACCENT } as React.CSSProperties} required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
            style={{ background: ACCENT }}>
            {loading ? 'Generating KPI Framework...' : 'Generate KPI Framework'}
          </button>
          {error && <div className="bg-red-900/30 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">{error}</div>}
        </form>
        {output && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-white">Generated KPI Dashboard Framework</h3>
              <button onClick={() => navigator.clipboard.writeText(output)}
                className="text-xs px-3 py-1.5 rounded-md text-white" style={{ background: `${ACCENT}40` }}>Copy</button>
            </div>
            <div className="px-6 py-6">
              <pre className="whitespace-pre-wrap text-gray-300 text-sm font-mono leading-relaxed">{output}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
