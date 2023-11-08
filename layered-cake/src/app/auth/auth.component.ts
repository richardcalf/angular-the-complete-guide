import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthenticationSevice } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData } from "../shared/authentication.models";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import { authenticateSuccess, startLogin,signUpStart,handleError } from './store/auth.actions'

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['../app.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    constructor(private authService:AuthenticationSevice, private router: Router, private componentFactoryResolver: ComponentFactoryResolver,
                private store: Store<fromApp.AppState>) {}
    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if(this.error) {
                this.showErrorAlert(this.error);
            }
        })
    }

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;
    private closeSub: Subscription;
    private storeSub: Subscription;

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
            this.store.dispatch(startLogin({email: email, password: password}))
        } else {
            this.store.dispatch(signUpStart({email: email, password: password}))
        }
        this.store.select('auth').subscribe(authState => {
        });
        form.reset();
    }

    onCloseErrorModal() {
        this.store.dispatch(handleError());
    }

    showErrorAlert(message: string) {
        const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if(this.closeSub) {
            this.closeSub.unsubscribe();
        }
        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }
}