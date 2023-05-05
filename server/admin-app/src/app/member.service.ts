import { Injectable } from '@angular/core';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';
import { Member } from './member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }
  getMembers(): Observable<Member[]> {
    return of(MEMBERS); // 実行の際に、Observableに変換して返す関数
  }
}
