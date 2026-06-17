import { useState } from "react";
import "./Dashboard"

export default function Support() {
  const [showSupport, setShowSupport] = useState(false);
  return (
   

   
    <div className="sidebar-footer">
      {/* Qaybta Support-ka */}
      <div className="support-wrapper">
        <div className="menu-item" onClick={() => setShowSupport(!showSupport)}>
          <span>🛠️</span> Support & Help
        </div>

        {/* Fariinta caawinaada ee soo dhacaysa marka la gujiyo */}
        {showSupport && (
          <div className="support-dropdown">
            <p>
              <strong>Haddii ay cilad dhacdo:</strong> Dib u cusbooneysii bogga
              (Refresh). Haddii ay dhibaatadu sii jirto, si toos ah ula xiriir
              engineer-ka.
            </p>
            <a
              href="https://wa.me/252636045303" 
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Badhanka Sign-out-ka ee hore u jiray */}
      <div className="menu-item logout-item">
        <span>🚪</span> Sign-out
      </div>
    </div>
  );
}
