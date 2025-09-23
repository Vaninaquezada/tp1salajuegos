import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  constructor(private http: HttpClient) {}

  getImg() {
    return this.http.get(
      'https://pixabay.com/api/?key=21351108-e70e13da005029798b867e59c&q=movies&image_type=photo&category=entretaiment&safesearch=true'
    );
  }
  getImgById(id: string) {
    return this.http.get(
      'https://pixabay.com/api/?key=21351108-e70e13da005029798b867e59c&id=' +
        id +
        '&safesearch=true'
    );
  }
}
