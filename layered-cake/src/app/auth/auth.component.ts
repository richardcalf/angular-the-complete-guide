import { Component } from "@angular/core";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['../app.component.css']
})
export class AuthComponent {
    isLoginMode = true;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
}