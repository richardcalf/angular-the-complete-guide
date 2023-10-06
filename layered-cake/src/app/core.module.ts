import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { LoggingService } from "./logging.service";

@NgModule({
    providers: [
        ShoppingListService, 
        RecipeService, 
        // LoggingService,
        { 
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService, 
          multi: true
         }
    ]
})
export class CoreModule {}