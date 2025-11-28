import axios from "axios";

const API_BASE = import.meta.env.VITE_BANK_API_URL;
const TOKEN = import.meta.env.VITE_BANK_API_TOKEN;

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/vnd.api+json",
    },
});

export async function fetchCustomers() {
    const res = await api.get("/customers");
    return res.data?.data || [];
}

export async function fetchPaymentsFor(customerId) {
    const res = await api.get(`/customers/${customerId}/payments`);
    return res.data?.data || [];
}

// Not used Function (used for tests)
// export async function fetchAllPayments() {
//     const customers = await fetchCustomers();
//     const all = [];

//     for (const c of customers) {
//         console.log("fetching customer:", c.id);
//         const payments = await fetchPaymentsFor(c.id);
//         payments.forEach((p) =>
//             all.push({
//                 customerId: c.id,
//                 customerName: c.attributes?.name,
//                 paymentId: p.id,
//                 amount: p.attributes?.amount,
//                 status: p.attributes?.status,
//             })
//         );
//     }

//     return all;
// }

export async function markPayment(paymentId, newStatus) {
    const body = {
        data: {
            type: "payments",
            id: String(paymentId),
            attributes: {
                status: String(newStatus),
            },
        },
    };

    const res = await api.patch(`/payments/${paymentId}`, body, {
        headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
        },
    });
    console.log(res.data);

    return res.data;
}

export async function fetchPaymentsForName(customerName) {
    console.log("customer asked:", customerName);
    const customers = await fetchCustomers();
    let customerId = "";
    if (customers) {
        for (const c of customers) {
            console.log("bank customer:", c.attributes.name);
            if (c.attributes.name == customerName) customerId = c.id;
        }

        if (customerId != "") {
            console.log("customer id found:", customerId);
            return fetchPaymentsFor(customerId);
        } else {
            console.log("Customer not found in bank's database");
            return [];
        }
    } else {
        console.log("Error calling fetchCustomers");
        return [];
    }
}

export default {
    fetchCustomers,
    fetchPaymentsFor,
    markPayment,
    fetchPaymentsForName,
};
