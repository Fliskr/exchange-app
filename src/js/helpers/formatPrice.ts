export default (value: string | number, showCents: boolean = false) => {
    const parsedPrice = value.toString().split(/[.,]/g);
    let [dollars] = parsedPrice;
    const [, cents = ""] = parsedPrice;
    const [cent1 = "0", cent2 = "0"] = cents;
    dollars = dollars.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    if (!showCents) {
        return dollars;
    }
    return `${dollars},${cent1}${cent2}`;
};
