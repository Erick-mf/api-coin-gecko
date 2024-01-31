import { Component } from "@angular/core";
import { MenuComponent } from "../menu/menu.component";
import { RouterLink, Router } from "@angular/router";
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [MenuComponent, ButtonComponent, RouterLink],
    templateUrl: "./header.component.html",
})
export class HeaderComponent {
    logo: string = "[ CoinFake /]";
    isLogin: boolean = true;

    constructor(private router: Router) {}

    isLoginOrRegisterRoute() {
        const route = this.router.url;
        return route === "/login" || route === "/register";
    }
}
