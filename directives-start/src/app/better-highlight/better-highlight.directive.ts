import { Directive, 
        Renderer2, 
        ElementRef, 
        OnInit, 
        HostListener,
        HostBinding, 
        Host} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  
  constructor(private elRef: ElementRef, private renderer: Renderer2)  {
  }

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}
