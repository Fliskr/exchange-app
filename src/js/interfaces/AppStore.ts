export default interface AppStore {
    currencies: Currencies;
    wallet: Wallet;
}

export interface Currencies {
    baseCurrency: string;
    rates: Currency;
    timestamp: number;
}

export interface Currency {
    [key: string]: number;
}

export interface Wallet {
    balance: Balance;
    history: WalletHistory[];
}

export interface WalletHistory{
    datetime: Date;
    changes: Balance;
}

export interface Balance {
    [key: string]: number;
}
