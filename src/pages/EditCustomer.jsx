import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../features/CustomerSlice";
import "./EditCustomer.css";
import toast from "react-hot-toast";

export default function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    Phone: "",
    folderName: "",
    customerType: "VIP",
    status: "Pending",
    amountPaid: 0,
    remainingAmount: 0,
    numberOfPhotos: 0,
  });

  // 🔥 GET SINGLE CUSTOMER (from list)
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://studio-managemant-backend.onrender.com/api/Customer/List",
        {
          headers: { Authorization: token },
        }
      );

      const customer = res.data.find((c) => c._id === id);

      if (customer) {
        setFormData(customer);
      }
    };

    fetchData();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit update
  const handleSubmit = async(e) => {
    e.preventDefault();

    await dispatch(updateCustomer({ id, customerData: formData })).unwrap();

    alert("Customer updated successfully ✅");
    toast.success("Customer si guule loo updated greyey")

    navigate("/Dashboard");
  };

  return (
    <div className="lenssuite-main edit-customer-container">
      <h1 className="form-title">Edit Customer</h1>

      <form onSubmit={handleSubmit} className="customer-form edit-form-card">
        
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input
            name="Phone"
            value={formData.Phone}
            onChange={handleChange}
            placeholder="Phone"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Folder Name</label>
          <input
            name="folderName"
            value={formData.folderName}
            onChange={handleChange}
            placeholder="Folder Name"
            className="form-input"
          />
        </div>

        <div className="form-group-grid">
          <div className="form-group">
            <label className="form-label">Number of Photos</label>
            <input
              name="numberOfPhotos"
              type="number"
              value={formData.numberOfPhotos}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Amount Paid ($)</label>
            <input
              name="amountPaid"
              type="number"
              value={formData.amountPaid}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Remaining Amount ($)</label>
            <input
              name="remainingAmount"
              type="number"
              value={formData.remainingAmount}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            name="customerType"
            value={formData.customerType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="VIP">VIP</option>
            <option value="NORMAL">NORMAL</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Status2</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn-submit-customer">
          Update Customer
        </button>
      </form>
    </div>
  );
}