import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ImageContainerItem } from './image-container-item/image-container-item.class';
import { SingleFileComponent } from './single-file/single-file.component';

const BASE_URL = environment.BASE_URL + 'product';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  constructor(private httpClient: HttpClient) {}

  getImageComponent(file) {
    return new ImageContainerItem(SingleFileComponent, { file });
  }

  uploadFiles(files: any[]) {
    const fileData = new FormData();

    fileData.append('email', 'fsadfd8');

    for (let file of files) {
      fileData.append('photo[]', file as File, file.name);
    }

    // for (const value of fileData.values()) {
    //   console.log(value);
    // }

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
}
