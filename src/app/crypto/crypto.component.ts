import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { CoinService } from "../coin.service";
import { PortfolioService } from "../portfolio.service";
import { Coin } from "../coin";

@Component({
    selector: "app-crypto",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./crypto.component.html",
})
export class CryptoComponent {
    result: any = [];
    isLogin: boolean = true;
    isAgreement: boolean = false;

    constructor(
        private ajax: CoinService,
        private portfolioService: PortfolioService,
    ) {}

    ngOnInit() {
        this.ajax.getCoinsList().subscribe((data: any) => {
            this.result = data;
        });
    }

    async toggleCoin(coin: Coin) {
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
