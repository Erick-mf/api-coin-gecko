import { Injectable } from "@angular/core";
import { Coin } from "./coin";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "@angular/fire/firestore";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root",
})
export class PortfolioService {
    portfolio: Coin[] = [];
    db: any = getFirestore();

    constructor(private authService: AuthService) {}

    async addCoin(coin: Coin) {
        const uid = this.authService.getCurrentUserId();
        // almacenabá más datos de los necesarios
        const coinData = {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            total_volume: coin.total_volume,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
        };
        const docRef = await addDoc(collection(this.db, `usuarios/${uid}/portfolio`), coinData);
        coin.id = docRef.id; // Almacena el ID del documento en el objeto Coin
    }

    async removeCoin(coin: Coin) {
        const uid = this.authService.getCurrentUserId();
        await deleteDoc(doc(this.db, `usuarios/${uid}/portfolio/${coin.id}`)); // Usa el ID del documento almacenado en el objeto Coin
    }

    async getPortfolio(): Promise<Coin[]> {
        const uid = this.authService.getCurrentUserId();
        const querySnapshot = await getDocs(collection(this.db, `users/${uid}/portfolio`));
        this.portfolio = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Coin; // Convierte DocumentData a Coin
            data.id = doc.id; // Asegúrate de que Coin tiene una propiedad id
            return data;
        });
        return this.portfolio;
    }
}
