import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL + '/product';

@Injectable({
  providedIn: 'root',
})
export class SingleFileService {
  constructor(private httpClient: HttpClient) {}

  uploadFiles(fileControl: AbstractControl) {
    const fileData = new FormData();

    fileData.append('email', 'fsadfd8');
    fileData.append(
      'photo',
      fileControl.value.file as File,
      fileControl.value.name
    );

    let headers = new HttpHeaders();
    // headers = headers.append('mime_type_map', mime_type_map);
    // headers = headers.append('path', './upload');
    // headers = headers.append('fileKey', 'photo');

    let params = new HttpParams();
    params = params.append('reportProgress', true);
    params = params.append('withCredentials', true);

    const options = {
      headers,
      params,
    };

    const mime_type_map = JSON.stringify({
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'imgage/jpg': 'jpg',
    });
    const folder = '1';

    return this.httpClient.post(`${BASE_URL}/upload/${folder}`, fileData, {
      withCredentials: true,
      reportProgress: true,
    });
  }

  // uploadFile(file: File) {
  //   console.log({ file });
  //   const fileData = new FormData();

  //   fileData.append('email', 'fsadfd8');
  //   fileData.append('photo', file as File, file.name.split('.')[0]);

  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'multipart/form-data');
  //   headers.append('enctype', 'multipart/form-data');
  //   // headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   headers.append('Accept', 'application/json');

  //   console.log({ headers });

  //   const params = new HttpParams();
  //   params.append('reportProgress', true);
  //   params.append('withCredentials', true);

  //   const options = {
  //     headers,
  //     params,
  //   };

  //   console.log({ options });

  //   for (const value of fileData.values()) {
  //     console.log(value);
  //   }

  //   return this.httpClient.post(`${BASE_URL}/upload`, fileData, options);
  // }
}
