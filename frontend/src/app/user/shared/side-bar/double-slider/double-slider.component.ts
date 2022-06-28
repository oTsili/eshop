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
      '#000000',
      this.toSlider.nativeElement
    );
    this.setToggleAccessible(this.toSlider.nativeElement);
  }

  controlFromInput(
    fromSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement
  ) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#000000', controlSlider);
    if (from > to) {
      fromSlider.value = to.toString();
      fromInput.value = to.toString();
    } else {
      fromSlider.value = from.toString();
    }
  }

  controlToInput(
    toSlider: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlSlider: HTMLInputElement
  ) {
    const [from, to] = this.getParsed(fromInput, toInput);
    this.fillSlider(fromInput, toInput, '#C6C6C6', '#000000', controlSlider);
    this.setToggleAccessible(toInput);
    if (from <= to) {
      toSlider.value = to.toString();
      toInput.value = to.toString();
    } else {
      toInput.value = from.toString();
    }
  }

  controlFromSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    fromInput: HTMLInputElement
  ) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#000000', toSlider);
    if (from > to) {
      fromSlider.value = to.toString();
      fromInput.value = to.toString();
    } else {
      fromInput.value = from.toString();
    }
  }

  controlToSlider(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    toInput: HTMLInputElement
  ) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#000000', toSlider);
    this.setToggleAccessible(toSlider);
    if (from <= to) {
      toSlider.value = to.toString();
      toInput.value = to.toString();
    } else {
      toInput.value = from.toString();
      toSlider.value = from.toString();
    }
  }

  getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  fillSlider(
    from: HTMLInputElement,
    to: HTMLInputElement,
    sliderColor: string,
    rangeColor: string,
    controlSlider: HTMLInputElement
  ) {
    const rangeDistance = parseInt(to.max) - parseInt(to.min);
    const fromPosition = parseInt(from.value) - parseInt(to.min);
    const toPosition = parseInt(to.value) - parseInt(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  setToggleAccessible(currentTarget: HTMLInputElement) {
    if (Number(currentTarget.value) <= 0) {
      this.toSlider.nativeElement.style.zIndex = 2;
    } else {
      this.toSlider.nativeElement.style.zIndex = 0;
    }
  }
}
