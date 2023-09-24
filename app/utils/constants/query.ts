import axios from "axios";

export const fetchUser = async () => {
    const QUERY = `
      query GetUsers {
        users(first: 100) {
          id
          reputation
        }
      }
    `;

    const endpoint = "https://api.studio.thegraph.com/query/53546/blockbitessubgraph/v.0.4.2";

    const response = await axios.post(endpoint, {
        query: QUERY,
    });

    return response.data.data.users; // Assuming the response will have the users data
};

export const fetchOrders = async (address: string) => {
    try {
        const endpoint = `https://ethereatsbackend-production.up.railway.app/orders/${address}`;
        const response = await axios.get(endpoint);
        console.log("ORDERS??", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
};
