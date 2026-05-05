import axios from "axios";

/**
 * Function to get the Bearer Token from Shiprocket
 */
const getShiprocketToken = async () => {
  try {
    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/auth/login",
      {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      },
    );

    if (!response.data.token) {
      throw new Error("No token received from Shiprocket");
    }

    return response.data.token;
  } catch (error) {
    console.error(
      "Shiprocket Auth Error:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to authenticate with Shiprocket");
  }
};

/**
 * Function to create a Shiprocket Order (adhoc)
 * @param {Object} orderData - Your formatted order details
 * @returns {Promise<Object>} Shiprocket API response (contains order_id on success)
 * @throws {Error} Throws error if Shiprocket returns a non-2xx response or missing order_id
 */
export const createShiprocketOrder = async (orderData) => {
  try {
    const token = await getShiprocketToken();

    // Optional: Basic payload validation before sending
    if (!orderData.order_id) throw new Error("Missing order_id in payload");
    if (
      !orderData.billing_pincode ||
      !/^\d{6}$/.test(String(orderData.billing_pincode))
    ) {
      throw new Error("billing_pincode must be a 6-digit string");
    }
    if (
      !orderData.billing_phone ||
      !/^\d{10}$/.test(String(orderData.billing_phone))
    ) {
      throw new Error("billing_phone must be a 10-digit string");
    }
    if (!orderData.pickup_location)
      throw new Error("pickup_location is required");
    if (!orderData.order_items || orderData.order_items.length === 0) {
      throw new Error("At least one order item is required");
    }

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Shiprocket returns { order_id, ... } on success (status 200)
    if (!response.data || !response.data.order_id) {
      console.error("Unexpected Shiprocket response:", response.data);
      throw new Error("Shiprocket did not return an order_id");
    }

    console.log(
      `✅ Shiprocket order created successfully: ${response.data.order_id}`,
    );
    return response.data; // e.g., { order_id: "12345", ... }
  } catch (error) {
    // Log the full error details
    if (error.response) {
      // The request was made and the server responded with a status code outside 2xx
      console.error("❌ Shiprocket API Error Response:");
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // The request was made but no response received
      console.error("❌ Shiprocket No Response:", error.request);
    } else {
      // Something else happened
      console.error("❌ Shiprocket Request Error:", error.message);
    }

    // Re-throw the error so the calling controller can handle it
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Shiprocket order creation failed",
    );
  }
};
