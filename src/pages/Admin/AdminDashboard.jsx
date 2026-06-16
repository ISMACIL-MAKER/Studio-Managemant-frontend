import "../../pages/Admin/AdminLayout.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminStats, getAllStudios } from "../../features/AdminSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  // Ka soo dhex bixi xogta stats-ka ee adminSlice
  const {
    totalStudios,
    studios,
    totalCustomers,
    activeStudios,
    inactiveStudios,
    loading,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminStats());
    dispatch(getAllStudios());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{ fontFamily: "sans-serif", color: "#64748b", padding: "20px" }}
      >
        Waa la soo kicinayaa xogta...
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      {/* 🚀 PLATFORM OVERVIEW HEADERS */}
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Platform Overview</h1>
        <p className="admin-dashboard-subtitle">
          Manage your photography ecosystem, monitor performance metrics, and
          oversee studio health from a centralized command center.
        </p>
      </div>
      {/* 📊 METRICS GRID */}
      <div className="admin-metrics-grid">
        {/* 🏢 CARD-KA KOOWAAD: TOTAL STUDIOS */}
        <div className="admin-metric-card">
          <div className="card-top-row">
            <div className="card-icon-wrapper">
              <span>🏢</span>
            </div>
            <div className="card-trend-badge">📈 +12%</div>
          </div>
          <div className="card-info">
            <span className="card-label">Total Studios</span>
            <h2 className="card-number">{totalStudios || 0}</h2>
          </div>
        </div>

        {/* 👥 CARD-KA LABAAD: TOTAL CUSTOMERS */}
        <div className="admin-metric-card">
          <div className="card-top-row">
            <div
              className="card-icon-wrapper"
              style={{ backgroundColor: "#e0f2fe" }}
            >
              <span style={{ fontSize: "20px" }}>👥</span>
            </div>
            <div
              className="card-trend-badge"
              style={{ backgroundColor: "#e0f2fe", color: "#0369a1" }}
            >
              📈 +8%
            </div>
          </div>
          <div className="card-info">
            <span className="card-label">Total System Customers</span>
            <h2 className="card-number">{totalCustomers || 0}</h2>
          </div>
        </div>

        {/* 🟢 CARD-KA SADDEXAAD: ACTIVE STUDIOS */}
        <div className="admin-metric-card">
          <div className="card-top-row">
            <div
              className="card-icon-wrapper"
              style={{ backgroundColor: "#dcfce7" }}
            >
              <span style={{ fontSize: "20px" }}>🟢</span>
            </div>
            <div
              className="card-trend-badge"
              style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
            >
              Live
            </div>
          </div>
          <div className="card-info">
            <span className="card-label">Active Studios</span>
            <h2 className="card-number" style={{ color: "#16a34a" }}>
              {activeStudios || 0}
            </h2>
          </div>
        </div>

        {/* 🔴 CARD-KA AFRAAD: INACTIVE STUDIOS */}
        <div className="admin-metric-card">
          <div className="card-top-row">
            <div
              className="card-icon-wrapper"
              style={{ backgroundColor: "#fee2e2" }}
            >
              <span style={{ fontSize: "20px" }}>🔴</span>
            </div>
            <div
              className="card-trend-badge"
              style={{ backgroundColor: "#fee2e2", color: "#b91c1c" }}
            >
              Paused
            </div>
          </div>
          <div className="card-info">
            <span className="card-label">Inactive Studios</span>
            <h2 className="card-number" style={{ color: "#dc2626" }}>
              {inactiveStudios || 0}
            </h2>
          </div>
        </div>
      </div>{" "}
      {/* <-- Halkan ayuu hadda xiridda Grid-ku si sax ah ugu jaraa */}
      {/* 📋 SHAXDA MAAMULKA XARUMAHA (STUDIO MANAGEMENT TABLE) - BANAAKAA LA SOO DHIGAY */}
      <div className="admin-table-section">
        <div className="table-header-container">
          <h2 className="table-title">Registered Studios</h2>
          <p className="table-subtitle">
            A complete list of all photography studios operating on the
            platform.
          </p>
        </div>

        <div className="table-responsive-wrapper">
          <table className="admin-studios-table">
            <thead>
              <tr>
                <th>Studio Name</th>
                <th>Email Address</th>
                <th>Joined Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {studios.length > 0 ? (
                studios.map((studio) => (
                  <tr key={studio._id}>
                    <td className="studio-name-cell">{studio.username}</td>
                    <td className="studio-email-cell">{studio.email}</td>
                    <td>{new Date(studio.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span
                        className={`status-badge ${studio.isActive ? "status-active" : "status-inactive"}`}
                      >
                        {studio.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="table-empty-state">
                    Wax studio ah oo diiwaangashan wali lama helin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
