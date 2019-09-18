import { BASE_CURRENCY } from "@helpers/constants";

export default async function() {
    const req = await fetch(
        `https://api.ratesapi.io/api/latest?base=${BASE_CURRENCY}&symbols=GBP,EUR`,
        {
            method: "GET",
            credentials: "same-origin"
        }
    );
    if (!req.ok) {
        throw "request failed";
    }
    return await req.json();
}
