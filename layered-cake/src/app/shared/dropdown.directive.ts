import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
     @HostBinding('class.open') menuOpen: boolean = false;
     
     @HostListener('click') toggleMenu() {
        this.menuOpen = !this.menuOpen;
     }
}