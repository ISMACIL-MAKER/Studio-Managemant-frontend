import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../features/CustomerSlice";
import "./Dashboard.css"; // Waxay wadaagayaan naqshadda weyn
import "./report.css"

export default function Reports() {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.Customer);

  useEffect(() => {
    if (!customers || customers.length === 0) {
      dispatch(getCustomer());
    }
  }, [dispatch, customers]);

  // 🔥 MISHIINKA XISAABINTA WARBIXINNADA (METRICS)
  const totalCustomers = customers?.length || 0;

  const totalIncome = customers?.reduce((acc, curr) => acc + (Number(curr.amountPaid) || 0), 0) || 0;

  const totalDebt = customers?.reduce((acc, curr) => acc + (Number(curr.remainingAmount) || 0), 0) || 0;

  const totalPhotos = customers?.reduce((acc, curr) => acc + (Number(curr.numberOfPhotos) || 0), 0) || 0;

  const vipCount = customers?.filter((c) => c.customerType === "VIP").length || 0;
  const normalCount = customers?.filter((c) => c.customerType === "NORMAL").length || 0;

  const pendingCount = customers?.filter((c) => c.status === "Pending").length || 0;
  const DeliveredCount = customers?.filter((c) => c.status === "Delivered").length || 0;
  const CompletedCount = customers?.filter((c) => c.status === "Completed").length || 0;

  if (loading) {
    return <div className="loading-text" style={{ textAlign: "center", padding: "40px" }}>Xogta warbixinta ayaa la soo kicinayaa...</div>;
  }

  return (
    <div className="lenssuite-main reports-container">
      
      {/* HEADER */}
      <div className="dashboard-header-row">
        <div>
          <h1 className="form-title">📊 Studio Reports</h1>
          <p className="form-subtitle">Halkan ka la soco dakhliga guud, deynta dibadda jirta, iyo pasg-yada macaamiisha.</p>
        </div>
      </div>

      {/* STATS GRID (Kaararka Xogta) */}
      <div className="reports-stats-grid">
        
        <div className="report-card income">
          <div className="card-icon">💰</div>
          <div className="card-info">
            <span className="card-label">Total Income</span>
            <h2 className="card-value">SLSH {totalIncome}</h2>
          </div>
        </div>

        <div className="report-card debt">
          <div className="card-icon">💸</div>
          <div className="card-info">
            <span className="card-label">Total Debt (Deynta)</span>
            <h2 className="card-value">SLSH {totalDebt}</h2>
          </div>
        </div>

        <div className="report-card users">
          <div className="card-icon">👥</div>
          <div className="card-info">
            <span className="card-label">Total Customers</span>
            <h2 className="card-value">{totalCustomers}</h2>
          </div>
        </div>

        <div className="report-card gallery">
          <div className="card-icon">📸</div>
          <div className="card-info">
            <span className="card-label">Photos Captured</span>
            <h2 className="card-value">{totalPhotos}</h2>
          </div>
        </div>

      </div>

      {/* BREAKDOWN SECTION */}
      <div className="reports-breakdown-row" style={{ marginTop: "32px" }}>
        <div className="form-card-wrapper">
          <h3 style={{ marginBottom: "16px", color: "#1e293b" }}>Customer Segmentation</h3>
          <div className="segment-list">
            <div className="segment-item">
              <span className="status-pill" style={{ backgroundColor: "#e6f4ea", color: "#137333" }}>⭐ VIP Customers</span>
              <strong style={{ fontSize: "18px" }}>{vipCount}</strong>
            </div>
            <div className="segment-item" style={{ marginTop: "12px" }}>
              <span className="status-pill" style={{ backgroundColor: "#e8f0fe", color: "#1a73e8" }}>🔵 NORMAL Customers</span>
              <strong style={{ fontSize: "18px" }}>{normalCount}</strong>
            </div>
          
            <div className="segment-item">
              <span className="status-pill" style={{ backgroundColor: "#f4f0e6", color: "#137333" }}> 🔴 Pendig</span>
              <strong style={{ fontSize: "18px" }}>{pendingCount}</strong>
            </div>
            <div className="segment-item" style={{ marginTop: "12px" }}>
              <span className="status-pill" style={{ backgroundColor: "#e8f0fe", color: "#1a73e8" }}>🔵  Delivered</span>
              <strong style={{ fontSize: "18px" }}>{DeliveredCount}</strong>
            </div>
            <div className="segment-item" style={{ marginTop: "12px" }}>
              <span className="status-pill" style={{ backgroundColor: "#e8f0fe", color: "rgb(2, 255, 99)" }}>🟢 Completed</span>
              <strong style={{ fontSize: "18px" }}>{CompletedCount}</strong>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}