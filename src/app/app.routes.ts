import { Routes } from "@angular/router";
import { CryptoComponent } from "./crypto/crypto.component";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { authGuard } from "./auth.guard";

export const routes: Routes = [
    { path: "", title: "CoinGecko", component: HomeComponent },
    { path: "register", title: "Registro", component: RegisterComponent },
    { path: "login", title: "Iniciar Sesión", component: LoginComponent },
    { path: "crypto", title: "Criptomonedas", component: CryptoComponent, canActivate: [authGuard] },
    { path: "portfolio", title: "Portfolio", component: PortfolioComponent, canActivate: [authGuard] },
    { path: "crypto/details/:id", title: "Detalles", component: DetailsComponent, canActivate: [authGuard] },
    { path: "**", redirectTo: "" },
];
