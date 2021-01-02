import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Tag, User } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { UserService } from 'src/app/user/user.service';
import { ROOT_PRIVELEGES } from 'src/assets/config';
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
    private _snackBarService: SnackBarService,
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
        this._snackBarService.error("Can't Load Tags.");
        this.router.navigate(['/']);
      }
    );
  }

  public onDelete(id: string) {
    this.tagsService.deleteTag(id).subscribe(
      (res: Response) => {
        this.setTags();
        this._snackBarService.success('Tag Deleted');
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error("Tag can't be deleted");
      }
    );
  }
}
