export default interface IRates{
    rates: {
        [key:string]: number;
    };
    timestamp: number;
}