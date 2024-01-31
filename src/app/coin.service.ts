import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class CoinService {
    private DETAILS_COIN_URL: string;
    private TRENDING_URL: string;
    private COINS_LIST_URL: string;

    constructor(private http: HttpClient) {
        this.DETAILS_COIN_URL = "https://api.coingecko.com/api/v3/coins/";
        this.COINS_LIST_URL =
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=2&page=1&sparkline=false&price_change_percentage=24h&locale=es&precision=1";
        this.TRENDING_URL = "https://api.coingecko.com/api/v3/search/trending";
    }

    getDetails(id: string) {
        return this.http.get(this.DETAILS_COIN_URL + id);
    }

    getTrending() {
        return this.http.get(this.TRENDING_URL);
    }

    getCoinsList() {
        return this.http.get<any>(this.COINS_LIST_URL).pipe(map((data: any[]) => data.slice(0, 50)));
    }
}
