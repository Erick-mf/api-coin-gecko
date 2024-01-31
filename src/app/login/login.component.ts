import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: "./login.component.html",
})
export class LoginComponent {
    email: string = "";
    password: string = "";

    constructor(private authService: AuthService) {}

    signIn() {
        this.authService.signIn(this.email, this.password);
    }

    signInWithGoogle() {
        this.authService.signInWithGoogle();
    }
}
