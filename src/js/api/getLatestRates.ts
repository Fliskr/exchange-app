import { SECRET_KEY } from "@helpers/constants";

export default async function() {
    const req = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${SECRET_KEY}`,
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            method: "GET"
        }
    );
    if (!res.ok) {
        throw "request failed";
    }
    const data = await req.json();
}
