import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  uid: number;

  setUid(uid: number) {
    this.uid = uid;
  }

  getUid(): number {
    return this.uid;
  }
}
