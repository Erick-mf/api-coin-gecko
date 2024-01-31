import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "./register.component.html",
})
export class RegisterComponent {
    constructor(private authService: AuthService) {}

    signUp(event: Event, email: string, password: string) {
        event.preventDefault();
        this.authService.signUp(email, password);
    }
}
