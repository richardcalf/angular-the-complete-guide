import { Directive, Input, HostBinding, HostListener, Renderer2, ElementRef } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
     menuClosed: boolean = true;

     constructor(private elRef: ElementRef, private renderer: Renderer2)  {
     }
     
     @HostListener('click') clicked(eventData: Event) {
        if(this.menuClosed) {
            this.renderer.addClass(this.elRef.nativeElement,'open');
        } else {
            this.renderer.removeClass(this.elRef.nativeElement,'open');
        }
        this.menuClosed = !this.menuClosed;
     }
}