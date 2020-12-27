import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Response, Tag, User } from 'src/app/interfaces';
import { UserService } from 'src/app/user/user.service';
import { MESSAGE_DURATION, ROOT_PRIVELEGES } from 'src/assets/config';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-all-tags',
  templateUrl: './all-tags.component.html',
  styleUrls: ['./all-tags.component.scss'],
})
export class AllTagsComponent implements OnInit {
  public tags: Tag[];
  public user: User = {
    _id: '',
    email: '',
    privelages: null,
    username: '',
  };
  public isLoaded: boolean = false;

  constructor(
    private tagsService: TagsService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const getUser = this.userService.getUserByToken();
    if (!getUser) {
      this.router.navigate(['/']);
      return;
    }

    getUser.subscribe((res: Response) => {
      this.user = res.data;
      if (this.user.privelages < ROOT_PRIVELEGES) {
        this.router.navigate(['/']);
        return;
      }
      this.setTags();
    });
  }

  private setTags(): void {
    this.tagsService.getAllTags().subscribe(
      (res: Response) => {
        this.tags = res.data;
        this.isLoaded = true;
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.tags = [];
        this.isLoaded = true;
      }
    );
  }

  public onDelete(id: string) {
    this.tagsService.deleteTag(id).subscribe((res: Response) => {
      this.setTags();
      this._snackBar.open('Tag Deleted', undefined, {
        duration: MESSAGE_DURATION,
      });
    }, (err: HttpErrorResponse) => {
      console.error(err);
      this._snackBar.open('Tag can\'t be deleted', undefined, {
        duration: MESSAGE_DURATION
      })
    });
  }
}
