import axios from "axios";

type AxiosError = {
    response?: {
        status: number;
        data: any;
    };
    message: string;
};

export async function POST(req: Request, res: any) {
    const { address } = await req.json();

    console.log("BACKEND ADDRESSSSSSS", address);

    if (typeof address !== "string") {
        return res.status(400).json({ error: "Invalid address format." });
    }

    const endpoint = `https://ethereatsbackend-production.up.railway.app/orders/${address}`;

    try {
        const response = await axios.get(endpoint);
        res.status(200).json(response.data);
    } catch (error) {
        const axiosError = error as AxiosError;
        res.status(axiosError.response?.status || 500).json(axiosError.response?.data || { message: axiosError.message });
    }
}
