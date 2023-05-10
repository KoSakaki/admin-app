import { Injectable } from '@angular/core';
import { MEMBERS } from './mock-members';
import { Observable, of } from 'rxjs';
import { Member } from './member';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private membersUrl = 'api/members';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }
  getMembers(): Observable<Member[]> {
    this.messageService.add('MemberService: 社員一覧データを取得しました');
    // return of(MEMBERS); // 実行の際に、Observableに変換して返す関数
    return this.http.get<Member[]>(this.membersUrl) // angularのhttpがObservableを利用しているため
      .pipe(
        tap(members => this.log('社員データを取得しました。')),
        catchError(this.handleError<Member[]>('getMembers', []))
      );
  }

  getMember(id: number): Observable<Member | undefined> {
    // this.messageService.add(`MemberService: 社員データ(id=${id})を取得しました。`);
    const url = `${this.membersUrl}/${id}`;
    return this.http.get<Member>(url)
      .pipe(
        tap(_ => this.log(`社員データ(id=${id})を取得しました。`)),
        catchError(this.handleError<Member>(`getMember id=${id}`))
      );
    // return of(MEMBERS.find(member => member.id === id));
  }

  updateMember(member: Member): Observable<any> {
    // http.putの引数は３つ(url, 変更先データ, 設定)
    return this.http.put(this.membersUrl, member, this.httpOptions)
      .pipe(
        tap(_ => this.log(`社員データ(${member.id})を変更しました。`)),
        catchError(this.handleError<any>('updateMember'))
      )
  }

  searchMembers(term: string): Observable<Member[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Member[]>(`${this.membersUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ?
          this.log(`社員データ(${term})を検索しました。`) :
          this.log(`社員データ(${term})は見つかりませんでした。`)),
        catchError(this.handleError<Member[]>('searchMembers', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`MessageSrvice: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} 失敗: ${error.message}`);
      return of(result as T); // アプリケーションが止まらないように
    }
  }

}
