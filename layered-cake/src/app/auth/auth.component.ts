import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationSevice } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['../app.component.css']
})
export class AuthComponent {
    constructor(private authService:AuthenticationSevice) {}

    isLoginMode = true;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        if(this.isLoginMode) {
            this.signIn(email, password);
        } else {
            this.signUp(email, password);
        }
        form.reset();
    }

    private signUp(email: string, password: string) {
        this.authService.signUp(email, password)
        .subscribe(response =>
            {
                console.log(response);
            }, 
            error => {
                console.log(error);
            });
        }

    private signIn(email: string, password: string) {
        this.authService.signIn(email, password)
        .subscribe(response => 
            {
                console.log(response);

            },
            error => {
                console.log(error);
            })

    }
}