import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from "../button/button.component";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-menu",
    standalone: true,
    imports: [RouterModule, ButtonComponent],
    templateUrl: "./menu.component.html",
})
export class MenuComponent {
    constructor(public authService: AuthService) {}

    signOut() {
        this.authService.signOut();
    }
}
