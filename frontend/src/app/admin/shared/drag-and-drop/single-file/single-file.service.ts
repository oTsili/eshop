import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL + 'product';

@Injectable({
  providedIn: 'root',
})
export class SingleFileService {
  constructor(private httpClient: HttpClient) {}

  uploadFiles(fileObj) {
    console.log({ fileObj });
    const fileData = new FormData();

    fileData.append('file', fileObj.file, fileObj.name);

    console.log({ fileData });

    return this.httpClient.post(
      `${BASE_URL}/upload`,
      { file: fileData },
      {
        withCredentials: true,
      }
    );
  }
}
