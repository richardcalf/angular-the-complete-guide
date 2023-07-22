import { Component, ElementRef, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, DoCheck, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None  
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, OnDestroy, AfterViewInit {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;


  constructor() {
    console.log('constructor called!');
   }

   ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called!');
    console.log(changes);
   }

  ngOnInit(): void {
    console.log('ngOnInit called!');
    console.log('Text Content: '+this.header.nativeElement.textContent);
  }

  ngDoCheck() {
    console.log('ngDoCheck called!');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called!');
    console.log('Text Content: '+this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called!');
  }

}
