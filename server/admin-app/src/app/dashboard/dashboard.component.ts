import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../member';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  members: Member[] = [];
// dependency Injection(DI)
  constructor(private memberService: MemberService) { }

  // ライフサイクルメソッド
  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    this.memberService.getMembers()
    .subscribe(members => this.members = members.slice(1,5));
  }

}
