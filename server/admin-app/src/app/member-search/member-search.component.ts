import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { Observable, Subject, debounce, distinctUntilChanged, switchMap, timer } from 'rxjs';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.css']
})
export class MemberSearchComponent implements OnInit {

  members$: Observable<Member[]>;
  private searchTerms = new Subject<string>(); 
  constructor(private memberSearvice: MemberService){}
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.members$ = this.searchTerms.pipe(
      debounce(() => timer(300)),
      distinctUntilChanged(),
      switchMap((term: string) => this.memberSearvice.searchMembers(term)),
    );
  }
}
