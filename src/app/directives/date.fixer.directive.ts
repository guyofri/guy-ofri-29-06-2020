import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Days } from "../common/enums";

@Directive({
  selector: '[dateToDay]'
})
export class DateToDayDirective implements OnInit {
  @Input() name: string;
  @Input() value: string;
  private  _nativeElement: ElementRef<any>;

  ngOnInit() {
    if (this.value) {
      let day:Number = new Date(this.value).getDay();
      this._nativeElement.nativeElement.innerText = Days[day.toString()];
    }
  }

  constructor(el: ElementRef) {
    this._nativeElement = el;
    }
}



