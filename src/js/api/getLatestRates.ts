export default async function() {
    const req = await fetch(
        "https://api.ratesapi.io/api/latest?base=USD&symbols=GBP,EUR",
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
