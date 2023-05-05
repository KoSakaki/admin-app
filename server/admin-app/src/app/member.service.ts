import { Injectable } from '@angular/core';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private membersUrl = 'api/members';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }
  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService: 社員一覧データを取得しました');
    // return of(MEMBERS); // 実行の際に、Observableに変換して返す関数
    return this.http.get<Member[]>(this.membersUrl); // angularのhttpがObservableを利用しているため
  }

  getMember(id: number): Observable<Member | undefined> {
    this.messageService.add(`MemberService: 社員データ(id=${id})を取得しました。`);
    return of(MEMBERS.find(member => member.id === id));
  }

  private log(message: string) {
    this.messageService.add(`MessageSrvice: ${message}`);
  }
}
