import { Component } from "@angular/core";
import { PortfolioService } from "../portfolio.service";
import { Coin } from "../coin";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-portfolio",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./portfolio.component.html",
})
export class PortfolioComponent {
    portfolio: Coin[] = [];

    constructor(private portfolioService: PortfolioService) {}

    async ngOnInit() {
        this.portfolio = await this.portfolioService.getPortfolio();
    }

    async removeCoin(coin: Coin) {
        await this.portfolioService.removeCoin(coin);
        this.portfolio = await this.portfolioService.getPortfolio();
    }

    async toggleCoin(coin: Coin) {
        if (await this.isInPortfolio(coin)) {
            await this.portfolioService.removeCoin(coin);
        } else {
            await this.portfolioService.addCoin(coin);
        }
        this.portfolio = await this.portfolioService.getPortfolio();
    }

    async isInPortfolio(coin: Coin) {
        const portfolio = await this.portfolioService.getPortfolio();
        return portfolio.some((c: Coin) => c.id === coin.id);
    }
}
