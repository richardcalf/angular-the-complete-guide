import { Component, ComponentFactoryResolver } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationSevice } from "./auth.service";
import { Observable } from "rxjs";
import { AuthResponseData } from "../shared/authentication.models";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['../app.component.css']
})
export class AuthComponent {
    constructor(private authService:AuthenticationSevice, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if(this.isLoginMode) {
            authObs = this.authService.signIn(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            response => {
                console.log( this.isLoginMode ? 'Logging In' : 'Signing Up' )
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, 
            error => {
                console.log(error);
                this.error = error;
                this.showErrorAlert(error);
                this.isLoading = false;
            });
        form.reset();
    }

    onCloseErrorModal() {
        this.error = null;
    }

    showErrorAlert(message: string) {
        const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    }
}