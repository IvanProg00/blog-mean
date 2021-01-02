import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  private second: number = 1000;
  public time: number = 5;

  constructor(private router: Router) {}

  ngOnInit() {
    const interval = setInterval(() => {
      this.time -= 1;
      if (this.time <= 0) {
        clearInterval(interval);
        this.router.navigate(['/']);
      }
    }, this.second);
  }
}
