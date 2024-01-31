import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./login.component.html",
})
export class LoginComponent {
    constructor(private authService: AuthService) {}

    signIn(email: string, password: string) {
        this.authService.signIn(email, password);
    }

    signInWithGoogle() {
        this.authService.signInWithGoogle();
    }
}
