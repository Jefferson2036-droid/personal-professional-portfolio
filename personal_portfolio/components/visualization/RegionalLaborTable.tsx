import regionalData from "../../data/derived/regional-labor-ny-nj-pa.json";

type Role = {
  roleFamily: string;
  regionPostings2025: number | null;
  nationalPostings2025: number | null;
  regionalShareOfNational: number | null;
  medianPostedSalaryUSD?: number;
  sourceId: string;
  provenance: string;
};

const formatCount = (n: number | null | undefined) =>
  n == null ? "—" : n.toLocaleString("en-US");

const formatShare = (n: number | null | undefined) =>
  n == null ? "—" : `${(n * 100).toFixed(1)}%`;

const formatSalary = (n: number | null | undefined) =>
  n == null ? "—" : `$${Math.round(n / 1000)}K`;

export function RegionalLaborTable() {
  const payload = regionalData as unknown as {
    geography: string;
    roles: Role[];
    caveats: string[];
  };

  return (
    <div className="regional-labor-table">
      <div className="regional-labor-table__eyebrow">
        NY · NJ · PA corridor · 2025 estimates
      </div>
      <div className="regional-labor-table__scroll">
        <table className="markdown-table">
          <thead>
            <tr>
              <th scope="col">Role family</th>
              <th scope="col" style={{ textAlign: "right" }}>Regional postings</th>
              <th scope="col" style={{ textAlign: "right" }}>National postings</th>
              <th scope="col" style={{ textAlign: "right" }}>Regional share</th>
              <th scope="col" style={{ textAlign: "right" }}>Median base</th>
            </tr>
          </thead>
          <tbody>
            {payload.roles.map((r) => (
              <tr key={r.roleFamily}>
                <th scope="row">{r.roleFamily}</th>
                <td style={{ textAlign: "right" }}>{formatCount(r.regionPostings2025)}</td>
                <td style={{ textAlign: "right" }}>{formatCount(r.nationalPostings2025)}</td>
                <td style={{ textAlign: "right" }}>{formatShare(r.regionalShareOfNational)}</td>
                <td style={{ textAlign: "right" }}>{formatSalary(r.medianPostedSalaryUSD)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <details className="regional-labor-table__caveats">
        <summary>Methodology and caveats</summary>
        <ul>
          {payload.caveats.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
