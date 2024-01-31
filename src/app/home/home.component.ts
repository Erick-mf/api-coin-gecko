import { Component } from "@angular/core";
import { CoinService } from "../coin.service";

@Component({
    selector: "app-home",
    standalone: true,
    templateUrl: "./home.component.html",
    imports: [],
})
export class HomeComponent {
    trending: any = [];
    coins: any = [];

    constructor(private coinService: CoinService) {}

    ngOnInit() {
        this.coinService.getTrending().subscribe((data) => {
            this.trending = data;
            this.coins = this.trending.coins;
        });
    }

    changePrice(price: number) {
        if (price.toString().includes("-")) {
            return true;
        }
        return false;
    }

    floatingPrice(price: number) {
        return price.toFixed(1);
    }
}
