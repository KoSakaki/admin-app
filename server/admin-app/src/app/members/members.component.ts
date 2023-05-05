import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[] | undefined;
  // dependency Injection(DI)
  constructor(private memberService: MemberService) { }

  // ライフサイクルメソッド
  ngOnInit(): void {
    this.getMembers();
  }


  getMembers(): void {
    this.memberService.getMembers() // Observable
      .subscribe(members => this.members = members);
  }
}
