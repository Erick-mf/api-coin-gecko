import { Routes } from "@angular/router";
import { CryptoComponent } from "./crypto/crypto.component";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";

export const routes: Routes = [
    { path: "home", title: "CoinGecko", component: HomeComponent },
    { path: "crypto", title: "Criptomonedas", component: CryptoComponent },
    { path: "portfolio", title: "Portfolio", component: PortfolioComponent },
    { path: "register", title: "Registro", component: RegisterComponent },
    { path: "login", title: "Iniciar Sesión", component: LoginComponent },
    { path: "crypto/details/:id", title: "Detalles", component: DetailsComponent },
    { path: "**", redirectTo: "home" },
];
