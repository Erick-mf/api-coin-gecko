import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GraphicComponent } from "../graphic/graphic.component";
import { CoinService } from "../coin.service";
import { Location } from "@angular/common";
import { Coin } from "../coin";
import { PortfolioService } from "../portfolio.service";

@Component({
    selector: "app-details",
    standalone: true,
    imports: [GraphicComponent],
    templateUrl: "./details.component.html",
})
export class DetailsComponent {
    id: string = "";
    result: any = [];
    dataGraphic: any = [];

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private ajax: CoinService,
        private portfolioService: PortfolioService,
    ) {}

    ngOnInit() {
        let idParam = this.route.snapshot.paramMap.get("id");
        if (idParam !== null) {
            this.id = idParam;
            this.ajax.getDetails(this.id).subscribe((data: any) => {
                this.result = data;
                this.dataGraphic = [
                    this.result.market_data.price_change_percentage_1y_in_currency.eur,
                    this.result.market_data.price_change_percentage_200d_in_currency.eur,
                    this.result.market_data.price_change_percentage_60d_in_currency.eur,
                    this.result.market_data.price_change_percentage_30d_in_currency.eur,
                    this.result.market_data.price_change_percentage_14d_in_currency.eur,
                    this.result.market_data.price_change_percentage_7d_in_currency.eur,
                    this.result.market_data.price_change_percentage_24h_in_currency.eur,
                    this.result.market_data.price_change_percentage_1h_in_currency.eur,
                ];
            });
        }
    }

    goBack() {
        this.location.back();
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

    async toggleCoin(coin: Coin) {
        coin = {
            id: this.result.id,
            name: this.result.name,
            symbol: this.result.symbol,
            // image: this.result.image,
            current_price: this.result.market_data.current_price.eur,
            market_cap: this.result.market_data.market_cap.eur,
            total_volume: this.result.market_data.total_volume.eur,
            high_24h: this.result.market_data.high_24h.eur,
            low_24h: this.result.market_data.low_24h.eur,
        };
        if (await this.isInPortfolio(coin)) {
            this.portfolioService.removeCoin(coin);
        } else {
            this.portfolioService.addCoin(coin);
        }
    }

    async isInPortfolio(coin: Coin) {
        const portfolio = await this.portfolioService.getPortfolio();
        return portfolio.some((c: Coin) => c.id === coin.id);
    }
}
