export interface Coin {
    id: string;
    name: string;
    symbol: string;
    image?: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
}
