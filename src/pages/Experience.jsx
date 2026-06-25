import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  useReveal()
  return (
    <section className="scene block page-top">
      <div className="wrap">
        <div className="shead reveal">
          <span className="idx">03</span>
          <h1>Execution Trace</h1>
          <div className="sub">work history · automation &amp; analysis</div>
          <div className="rule"></div>
        </div>
        <div className="tl reveal">
          <div className="node">
            <div className="exp">
              <div className="top">
                <span className="org">University of Connecticut</span>
                <span className="role">Data Analyst · Catering Services</span>
                <span className="when">Aug 2024 — May 2026</span>
              </div>
              <div className="ctx">◷ Catering &amp; Dining Services · supporting the sales &amp; operations teams · Connecticut</div>
              <ul>
                <li>Built and maintained dashboards for the catering sales team — turning raw sales and operational data into clear, actionable insight.</li>
                <li>Automated reporting pipelines for a 10-member team and 30+ staff, cutting manual data processing and improving consistency.</li>
                <li>Partnered with the operations team to track performance and surface trends that informed day-to-day decisions.</li>
                <li>Translated metrics into plain-language insight so non-technical sales and operations staff could act on the data.</li>
              </ul>
              <div className="shows">
                <span className="dem">Demonstrates →</span> data analysis · BI dashboards · reporting automation · operations insight · stakeholder communication
              </div>
            </div>
          </div>

          <div className="node">
            <div className="exp">
              <div className="top">
                <span className="org">Egniol Services Private Limited</span>
                <span className="role">Financial Research &amp; Strategy Analyst</span>
                <span className="when">Dec 2023 — May 2024</span>
              </div>
              <div className="ctx">◷ Ahmedabad-based consultancy — 360° funding, strategy &amp; compliance advisory for Indian startups &amp; MSMEs</div>
              <ul>
                <li>Worked with 100+ startup and MSME clients across IT, healthcare, agriculture and manufacturing — advising on business strategy, funding readiness and growth planning.</li>
                <li>Built pitch decks for founders from scratch: researched the market, mapped competitors, and put together the financial story investors expect to see.</li>
                <li>Created financial projections and business models tailored to each client's industry and stage — used to support funding conversations and business planning.</li>
                <li>Researched government grant and subsidy schemes relevant to each client and helped prepare the supporting documentation.</li>
                <li>Translated dense business and regulatory information into clear recommendations that non-finance founders could understand and act on.</li>
              </ul>
              <span className="badge">★ Earned the firm's Mark of Excellence award</span>
              <div className="shows">
                <span className="dem">Demonstrates →</span> business research · pitch deck creation · financial modeling · market analysis · startup consulting · stakeholder communication
              </div>
            </div>
          </div>

          <div className="node">
            <div className="exp">
              <div className="top">
                <span className="org">WayToWeb Pvt Ltd</span>
                <span className="role">React Developer · Internship</span>
                <span className="when">Jun 2022 · 1 mo</span>
              </div>
              <div className="ctx">◷ On-site internship · Ahmedabad, Gujarat, India</div>
              <ul>
                <li>Built and maintained ReactJS-based single-page applications.</li>
                <li>Resolved technical issues and provided technical support to end-users.</li>
                <li>Contributed across multiple projects using ReactJS, React Router and core web fundamentals.</li>
              </ul>
              <span className="badge">✔ Certificate of Completion · ReactJS</span>
              <div className="shows">
                <span className="dem">Demonstrates →</span> React.js · front-end development · single-page apps · React Router
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
