import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  public comments: boolean = false;
  public commentsData: any;
  public issue: string;
  public avatar: string;
  public repo: string;
  public params: { repo: null, user: null };
  @Input() data: Object;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.repo = params.repo;
    });
    this.getAvatar();
  }

  getAvatar() {
    //TODO...
  }

  getAssignee(index) {
    return (this.data[index].assignee ? this.data[index].assignee.login : "none");
  }

  getComments(issueNumber, issueTitle) {
    this.route.queryParams.subscribe(params => {
      (async () => {
        let res = await fetch(`https://api.github.com/repos/${params.user}/${params.repo}/issues/${issueNumber}/comments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });
        try {
          this.commentsData = await res.json();
          this.comments = true;
          this.issue = issueTitle;
        } catch (err) {
          alert("not found"); //TODO... 
        }
      })()
    })
  }
}
