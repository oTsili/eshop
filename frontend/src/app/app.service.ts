import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  private languageChangeListener = new Subject<string>();
  private selectedLang: string;

  constructor(private http: HttpClient) {}

  getLanguageChangeListener() {
    return this.languageChangeListener.asObservable();
  }

  onLanguageChange(lang: string) {
    this.languageChangeListener.next(lang);
  }

  set selectedLanguage(language: string) {
    this.selectedLang = language;
  }

  get selectedLanguage() {
    return this.selectedLang;
  }

  /**
   * Returns a substring of string between provided start string
   * and end string
   * @param str the initial string
   * @param start the character/string from which the substring wil begin
   * @param end the character/string from which the substring will end
   * @returns the substring between start and end strings
   */
  getSubstring(str: string, start: string, end: string): string {
    const startIndex = str.indexOf(start);
    const endIndex = str.indexOf(end);
    if (startIndex != -1 && endIndex != -1 && endIndex >= startIndex) {
      return str.substring(startIndex, endIndex);
    } else {
      return '';
    }
  }

  /**
   * Gets a string and an array and returns the index of
   * the string inside the array
   * @param text a string
   * @param array of strings
   * @returns the index of the string inside the array
   */
  getArrayIndex(text: string, array: any[]) {
    const colorIndex = array.findIndex((item) => {
      return item.text === text;
    });
    return colorIndex;
  }

  getFilesIndex(file: File, array: any[]) {
    const fileIndex = array.findIndex((item) => {
      return item === file;
    });
    return fileIndex;
  }

  getFileNamesIndex(name: string, array: any[]) {
    const fileIndex = array.findIndex((item) => {
      return item.name === name;
    });
    return fileIndex;
  }

  getDateString(): string {
    // get the current date
    const m = new Date();
    // convert
    const dateString = `${m.getUTCFullYear()}/${
      m.getUTCMonth() + 1
    }/${m.getUTCDate()} ${String(
      m.getUTCHours() + 2
    )}:${m.getUTCMinutes()}:${m.getUTCSeconds()}`;

    return dateString;
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
