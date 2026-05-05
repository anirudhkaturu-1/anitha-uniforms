import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const OrderTracking = ({ orderId, token, onClose }) => {
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracking = async () => {
      try {
        // Use authenticated endpoint because user is logged in
        const url = `${BACKEND_URL}/api/orders/track/${orderId}`;
        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await axios.get(url, { headers });
        if (data.success) setTracking(data);
        else setError(data.message);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load tracking details",
        );
      } finally {
        setLoading(false);
      }
    };
    if (orderId && token) fetchTracking();
  }, [orderId, token]);

  if (loading)
    return (
      <div className="mt-4 p-4 text-center text-gray-500">
        Fetching tracking...
      </div>
    );
  if (error)
    return (
      <div className="mt-4 p-4 text-red-600 bg-red-50 rounded">{error}</div>
    );

  return (
    <div className="mt-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-gray-800">📦 Tracking Information</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <span className="text-xs text-gray-500">AWB Number</span>
          <p className="font-mono font-medium">{tracking.awbCode}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Courier</span>
          <p className="font-medium">{tracking.courierName}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Current Status</span>
          <p className="font-medium capitalize">
            {tracking.tracking?.status || "Pending"}
          </p>
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-700 mb-2">Shipment History</h4>
        {tracking.tracking?.tracking_details?.length ? (
          <div className="space-y-2">
            {tracking.tracking.tracking_details.map((event, idx) => (
              <div key={idx} className="border-l-2 border-violet-300 pl-3 py-1">
                <p className="text-sm font-medium">{event.status}</p>
                {event.location && (
                  <p className="text-xs text-gray-500">{event.location}</p>
                )}
                <p className="text-xs text-gray-400">{event.updated_at}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No tracking updates yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
