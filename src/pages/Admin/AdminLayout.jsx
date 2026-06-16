import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";
import "../../pages/Admin/AdminLayout.css";
import {
  FaChartBar,
  FaBuilding,
  FaUsers,
  FaCamera,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Kani wuxuu inoo sheegayaa bogga aan taagan nahay

  // Xogta superadmin-ka haddii aad rabto inaad magaciisa muujiso
  const { userCustomer } = useSelector((state) => state.auth);

  // Helper function si loo ogaado menu-ka firfircoon (Active Link)
  const isActive = (path) =>
    location.pathname === path ? "menu-item2 active" : "menu-item2";

  return (
    <div className="lenssuite-layout2">
      {/* SIDEBAR-KA GUUD — MAR KASTA WUU TAAGNAANAYAA */}
      <div className="lenssuite-sidebar2">
        <div className="sidebar-brand2">
          <div className="brand-icon2">📸</div>
          <div>
            <h3> {userCustomer?.username || "Admin"}</h3>
            <p>Pro Plan</p>
          </div>
        </div>

        <nav className="sidebar-menu2">
          <div
            className={isActive("/Admin/AdminDashboard")}
            onClick={() => navigate("/Admin/AdminDashboard")}
          >
            <span>
              <FaChartBar />
            </span>{" "}
            Dashboard
          </div>
          <div
            className={isActive("/Admin/ManageStudios")}
            onClick={() => navigate("/Admin/ManageStudios")}
          >
            <span>
              <FaBuilding />
            </span>{" "}
            ManageStudios
          </div>
          <div
            className={isActive("/Admin/Customers")}
            onClick={() => navigate("/Admin/Customers")}
          >
            <span>
              <FaUsers />
            </span>{" "}
            Customers
          </div>
        </nav>

        <div className="sidebar-footer2">
          <div className="menu-item2">
            <span>❓</span> Support
          </div>
          <div
            className="menu-item2"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <span>
              <FaSignOutAlt />
            </span>{" "}
            Sign Out
          </div>
        </div>
      </div>

      {/* QAYBTA MIDIG EE BOGAGGU KU KALA BEDDELMAYAAN */}
      <div className="lenssuite-main2">
        <Outlet />
      </div>
    </div>
  );
}
