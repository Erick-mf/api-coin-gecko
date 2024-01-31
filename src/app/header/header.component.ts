import { Component } from "@angular/core";
import { MenuComponent } from "../menu/menu.component";
import { RouterLink, Router } from "@angular/router";
import { ButtonComponent } from "../button/button.component";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MenuComponent, ButtonComponent, RouterLink],
    templateUrl: "./header.component.html",
})
export class HeaderComponent {
    logo: string = "[ CoinFake /]";
    isLogin: boolean;

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        this.isLogin = this.authService.isLoggedIn();
        console.log(this.isLogin);
    }

    isLoginOrRegisterRoute() {
        const route = this.router.url;
        return route === "/login" || route === "/register";
    }
}
