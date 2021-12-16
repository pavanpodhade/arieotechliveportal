
import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({ selector: '[numbersOnly]' })
export class OnlynumberDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('keypress') onkeypress(e:any) {
    let event = e || window.event;
    let charCode = event.which ? event.which : event.keyCode;
    let value: any = this.elementRef.nativeElement.value.replace(
      /[^0-9\.]/g,
      ''
    );
    let splits: any = value.split('.') || [];
    if ((splits.length > 1 && splits[1].length > 1) || splits[0].length > 11) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (
      (event.which != 46 || value.indexOf('.') != -1) &&
      (event.which < 48 || event.which > 57)
    ) {
      event.preventDefault();
    }
  }
}
