import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public foundRepository: boolean = false;
  public data: any;
  public repo: HTMLInputElement;
  public user: HTMLInputElement;
  public err: boolean = false;
  public errorMessage: string = "";
  public title: string = "ADP-task";

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (!params.user || !params.repo ) {
        this.foundRepository = false;
      } else {
        this.checkRepo(params.repo, params.user, false);
      }
    });
  }

  checkRepo(repo: string, user: string, showAlert = true) {
    (async () => {
      let res = await fetch(`https://api.github.com/repos/${user}/${repo}/issues`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      try {
        this.data = await res.json();
        if (!Array.isArray(this.data)) {
          if (showAlert) {
            this.errorMessage = this.data.message;
            this.err = true;
            setTimeout(() => {
              this.err = false;
            }, 2000);
          }
          return;
        }
        this.foundRepository = true;
        this.router.navigate(
          ["issues"],
          {
            relativeTo: this.route,
            replaceUrl: true,
            queryParams: {
              user: user,
              repo: repo
            }
          }
        );
      } catch (err) {
        this.errorMessage = err;
            this.err = true;
            setTimeout(() => {
              this.err = false;
            }, 2000);
      }
    })()
  }

  clearInput(repo, user) {
    user.value = "";
    repo.value = "";
  }
}
