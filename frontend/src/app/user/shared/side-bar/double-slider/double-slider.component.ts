import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-double-slider',
  templateUrl: './double-slider.component.html',
  styleUrls: ['./double-slider.component.scss'],
})
export class DoubleSliderComponent implements OnInit {
  @ViewChild('fromSlider', { static: true }) fromSlider: ElementRef;
  @ViewChild('toSlider', { static: true }) toSlider: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.fillSlider(
      this.fromSlider.nativeElement,
      this.toSlider.nativeElement,
      '#C6C6C6',
      '#25daa5',
      this.toSlider.nativeElement
    );
    this.setToggleAccessible(this.toSlider);
  }

  controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromSlider.value = from;
    }
  }

  controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    this.setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
    }
  }

  controlFromSlider(fromSlider, toSlider, fromInput) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    console.log(from, to);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
    } else {
      fromInput.value = from;
    }
  }

  controlToSlider(fromSlider, toSlider, toInput) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
    } else {
      toInput.value = from;
      toSlider.value = from;
    }
  }

  getParsed(currentFrom, currentTo) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    const rangeDistance = to.max - to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  setToggleAccessible(currentTarget) {
    // const toSlider = document.querySelector('#toSlider');
    if (Number(currentTarget.value) <= 0) {
      this.toSlider.nativeElement.style.zIndex = 2;
    } else {
      this.toSlider.nativeElement.style.zIndex = 0;
    }
  }
}
