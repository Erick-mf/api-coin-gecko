import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../auth.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "app-register",
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: "./register.component.html",
})
export class RegisterComponent {
    email: string = "";
    password: string = "";

    constructor(private authService: AuthService) {}

    signUp(event: Event) {
        event.preventDefault();
        this.authService.signUp(this.email, this.password);
    }
}
