import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomer } from "../features/CustomerSlice";
import "./Dashboard.css";
import "./report.css";

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
  const totalIncome =
    customers?.reduce((acc, curr) => acc + (Number(curr.amountPaid) || 0), 0) ||
    0;
  const totalDebt =
    customers?.reduce(
      (acc, curr) => acc + (Number(curr.remainingAmount) || 0),
      0,
    ) || 0;
  const totalPhotos =
    customers?.reduce(
      (acc, curr) => acc + (Number(curr.numberOfPhotos) || 0),
      0,
    ) || 0;

  // 1. Segmentation Counts
  const vipCount =
    customers?.filter((c) => c.customerType === "VIP").length || 0;
  const normalCount =
    customers?.filter((c) => c.customerType === "NORMAL").length || 0;

  // 2. Status Counts
  const pendingCount =
    customers?.filter((c) => c.status === "Pending").length || 0;
  const deliveredCount =
    customers?.filter((c) => c.status === "Delivered").length || 0;
  const completedCount =
    customers?.filter((c) => c.status === "Completed").length || 0;

  // 3. PhotoType Counts (Aad ayay ugu qurux badan tahay Report-ka studio-ga!)
  const weddingCount =
    customers?.filter((c) => c.PhotoType === "Wedding").length || 0;
  const portraitCount =
    customers?.filter((c) => c.PhotoType === "Portrait").length || 0;
  const headshotCount =
    customers?.filter((c) => c.PhotoType === "Headshot").length || 0;
  const idCardCount =
    customers?.filter((c) => c.PhotoType === "ID_Card").length || 0;
  const othersCount =
    totalCustomers -
    (weddingCount + portraitCount + headshotCount + idCardCount);

  if (loading) {
    return (
      <div
        className="loading-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <div
          className="loading-text"
          style={{ fontSize: "16px", color: "#64748b" }}
        >
          🔄 Xogta warbixinta LensSuite ayaa la soo kicinayaa...
        </div>
      </div>
    );
  }

  return (
    <div className="lenssuite-main reports-container">
      {/* HEADER */}
      <div className="dashboard-header-row" style={{ marginBottom: "24px" }}>
        <div>
          <h1
            className="form-title"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span>📊</span> Studio Analytics & Reports
          </h1>
          <p className="form-subtitle">
            Halkan ka la soco dakhliga guud, deynta dibadda jirta, iyo pasg-yada
            macaamiisha studio-gaaga.
          </p>
        </div>
      </div>

      {/* STATS GRID (Kaararka Xogta) */}
      <div className="reports-stats-grid">
        <div className="report-card income">
          <div
            className="card-icon"
            style={{ background: "#e6f4ea", color: "#137333" }}
          >
            💰
          </div>
          <div className="card-info">
            <span className="card-label">Total Income</span>
            <h2 className="card-value">{totalIncome.toLocaleString()}</h2>
          </div>
        </div>

        <div className="report-card debt">
          <div
            className="card-icon"
            style={{ background: "#fef7e0", color: "#b06000" }}
          >
            💸
          </div>
          <div className="card-info">
            <span className="card-label">Total Debt (Deynta)</span>
            <h2
              className="card-value"
              style={{ color: totalDebt > 0 ? "#dc2626" : "#475569" }}
            >
              {totalDebt.toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="report-card users">
          <div
            className="card-icon"
            style={{ background: "#e8f0fe", color: "#1a73e8" }}
          >
            👥
          </div>
          <div className="card-info">
            <span className="card-label">Total Customers</span>
            <h2 className="card-value">{totalCustomers}</h2>
          </div>
        </div>

        <div className="report-card gallery">
          <div
            className="card-icon"
            style={{ background: "#f3e8ff", color: "#7e22ce" }}
          >
            📸
          </div>
          <div className="card-info">
            <span className="card-label">Photos Captured</span>
            <h2 className="card-value">{totalPhotos}</h2>
          </div>
        </div>
      </div>

      {/* BREAKDOWN SECTION - Loo kala qaybiyey sadex tiir oo nifamsan */}
      <div
        className="reports-breakdown-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        {/* CARD 1: CUSTOMER TYPES */}
        <div
          className="form-card"
          style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#1e293b",
              fontSize: "16px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            👤 Client Segments
          </h3>
          <div
            className="segment-list"
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              className="segment-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="status-pill"
                style={{
                  backgroundColor: "#e6f4ea",
                  color: "#137333",
                  fontWeight: "500",
                }}
              >
                ⭐ VIP Tier
              </span>
              <strong style={{ fontSize: "16px", color: "#1e293b" }}>
                {vipCount} clients
              </strong>
            </div>
            <div
              className="segment-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="status-pill"
                style={{
                  backgroundColor: "#e8f0fe",
                  color: "#1a73e8",
                  fontWeight: "500",
                }}
              >
                🔵 Normal Tier
              </span>
              <strong style={{ fontSize: "16px", color: "#1e293b" }}>
                {normalCount} clients
              </strong>
            </div>
          </div>
        </div>

        {/* CARD 2: ORDER STATUS */}
        <div
          className="form-card"
          style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#1e293b",
              fontSize: "16px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            📦 Order Status Overview
          </h3>
          <div
            className="segment-list"
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              className="segment-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="status-pill"
                style={{
                  backgroundColor: "#fef7e0",
                  color: "#b06000",
                  fontWeight: "500",
                }}
              >
                ⏳ Pending Orders
              </span>
              <strong style={{ fontSize: "16px", color: "#1e293b" }}>
                {pendingCount}
              </strong>
            </div>
            <div
              className="segment-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="status-pill"
                style={{
                  backgroundColor: "#e8f0fe",
                  color: "#1a73e8",
                  fontWeight: "500",
                }}
              >
                🚚 Delivered
              </span>
              <strong style={{ fontSize: "16px", color: "#1e293b" }}>
                {deliveredCount}
              </strong>
            </div>
            <div
              className="segment-item"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="status-pill"
                style={{
                  backgroundColor: "#e6f4ea",
                  color: "#137333",
                  fontWeight: "500",
                }}
              >
                ✅ Completed
              </span>
              <strong style={{ fontSize: "16px", color: "#137333" }}>
                {completedCount}
              </strong>
            </div>
          </div>
        </div>

        {/* CARD 3: PHOTO TYPE BREAKDOWN */}
        <div
          className="form-card"
          style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h3
            style={{
              marginBottom: "20px",
              color: "#1e293b",
              fontSize: "16px",
              borderBottom: "1px solid #f1f5f9",
              paddingBottom: "10px",
            }}
          >
            🖼️ Popular Photo Types
          </h3>
          <div
            className="segment-list"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#64748b" }}>👰 Wedding Sessions:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>
                {weddingCount}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#64748b" }}>📸 Portrait:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>
                {portraitCount}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#64748b" }}>👤 Headshot:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>
                {headshotCount}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
            >
              <span style={{ color: "#64748b" }}>🪪 ID Cards:</span>
              <span style={{ fontWeight: "600", color: "#1e293b" }}>
                {idCardCount}
              </span>
            </div>
            {othersCount > 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  borderTop: "1px dashed #f1f5f9",
                  paddingTop: "6px",
                }}
              >
                <span style={{ color: "#aaadb3" }}>Others:</span>
                <span style={{ fontWeight: "600", color: "#aaadb3" }}>
                  {othersCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
