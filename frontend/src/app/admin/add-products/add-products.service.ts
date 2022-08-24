import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root',
})
export class AddProductsService {
  private colorsArrayListener = new BehaviorSubject<string[]>([]);
  private filesArrayListener = new BehaviorSubject<File[] | null>(null);
  private mainSrcListener = new BehaviorSubject<string | null>(null);
  private altSrcListener = new BehaviorSubject<string | null>(null);
  private mainSrcName: string;
  private altSrcName: string;
  private colorsArr: string[] = [];
  private filesArr: File[] = [];

  constructor(private appService: AppService) {}

  // Color array
  getColorsArrayListener() {
    return this.colorsArrayListener.asObservable();
  }

  updateColorsArray() {
    this.colorsArrayListener.next(this.colorsArr);
  }

  pushColorsArray(value: string) {
    this.colorsArr.push(value);
    this.updateColorsArray();
  }

  getColorsArray() {
    return this.colorsArr;
  }

  spliceColorsArray(value: string) {
    const index = this.appService.getArrayIndex(value, this.filesArr);
    this.filesArr.splice(index, 1);
    this.updateColorsArray();
  }

  // files array
  getFilesArrayListener() {
    return this.filesArrayListener.asObservable();
  }

  updateFilesArray() {
    this.filesArrayListener.next(this.filesArr);
  }

  pushFilesArray(file: File) {
    this.filesArr.push(file);
    this.updateFilesArray();
  }

  getFilesArray() {
    return this.filesArr;
  }

  spliceFilesArray(file: File) {
    const index = this.appService.getFilesIndex(file, this.filesArr);
    this.filesArr.splice(index, 1);
    this.updateFilesArray();
  }

  // src
  setMain(name: string) {
    // const index = this.appService.getFileNamesIndex(name, this.filesArr);
    // console.log({ index });
    this.mainSrcName = name;
    this.updateMainSrc(name);
  }

  getMain() {
    return this.mainSrcName;
  }

  setAlt(name: string) {
    this.altSrcName = name;
    this.updateAltSrc(name);
  }

  getAlt() {
    return this.altSrcName;
  }

  getMainSrcListener() {
    return this.mainSrcListener.asObservable();
  }

  getAltSrcListener() {
    return this.altSrcListener.asObservable();
  }

  updateMainSrc(value) {
    this.mainSrcListener.next(value);
  }

  updateAltSrc(value) {
    this.altSrcListener.next(value);
  }
}
