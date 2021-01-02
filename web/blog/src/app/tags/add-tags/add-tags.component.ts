import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AddTag, Response, User } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { UserService } from 'src/app/user/user.service';
import { ROOT_PRIVELEGES } from 'src/assets/config';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss'],
})
export class AddTagsComponent implements OnInit {
  public tagForm: FormGroup;
  private tag: AddTag = {
    title: '',
    token: '',
  };

  constructor(
    private tagsService: TagsService,
    private userService: UserService,
    private router: Router,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    const getUser = this.userService.getUserByToken();
    if (!getUser) {
      this.router.navigate(['/']);
      return;
    }
    getUser.subscribe((res: Response) => {
      const user: User = res.data;
      if (user.privelages < ROOT_PRIVELEGES) {
        this.router.navigate(['/']);
      }
    });
    this.tagForm = new FormGroup({
      title: new FormControl(this.tag.title, [Validators.required]),
      token: new FormControl(this.userService.getToken()),
    });
  }

  public onSubmit(): void {
    if (!this.tagForm.invalid) {
      this.tagsService.createTag(this.tagForm.value).subscribe(
        (_: Response) => {
          this._snackBarService.success('Tag Created.');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          if (err.status === 0) {
            this._snackBarService.error("You Can't Create A Tag.");
            this.router.navigate(['/']);
          } else {
            if (err?.error?.error?.error?.title) {
              this.title.setErrors({ title: err?.error?.error?.error?.title });
            }
          }
        }
      );
    }
  }

  get title(): AbstractControl {
    return this.tagForm.get('title');
  }
}
