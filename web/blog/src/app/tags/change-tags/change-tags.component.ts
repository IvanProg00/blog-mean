import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeTag, Response } from 'src/app/interfaces';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { UserService } from 'src/app/user/user.service';
import { ROOT_PRIVELEGES } from 'src/assets/config';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-change-tags',
  templateUrl: './change-tags.component.html',
  styleUrls: ['./change-tags.component.scss'],
})
export class ChangeTagsComponent implements OnInit {
  private tag: ChangeTag = {
    _id: '',
    title: '',
  };
  public tagForm: FormGroup = new FormGroup({
    _id: new FormControl(this.tag._id),
    title: new FormControl(this.tag.title, [Validators.required]),
  });

  constructor(
    private tagService: TagsService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    const getUserByToken = this.userService.getUserByToken();
    if (!getUserByToken) {
      this.router.navigate(['/']);
      return;
    }

    this.userService.getUserByToken().subscribe(
      (res: Response) => {
        const privalages = res.data?.privelages;
        if (privalages < ROOT_PRIVELEGES) {
          this._snackBarService.error("You can't be here.");
          this.router.navigate(['/']);
          return;
        }
        this.activatedRoute.params.subscribe((params: Params) => {
          this.setTag(params.id);
        });
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this._snackBarService.error('Your Account Not Found.');
        this.userService.dropToken();
        this.router.navigate(['/']);
      }
    );
  }

  private setTag(id: string): void {
    this.tagService.getTag(id).subscribe((res: Response) => {
      this.tag = {
        _id: res.data?._id,
        title: res.data?.title,
      };

      this._id.setValue(this.tag._id);
      this.title.setValue(this.tag.title);
    });
  }

  public onSubmit(): void {
    this.tagService.changeTag(this.tagForm.value).subscribe(
      (_: Response) => {
        this.router.navigate(['/tags']);
        this._snackBarService.success('Tag Changed.');
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        if (err.status === 0) {
          this._snackBarService.error("You can't change this tag");
          this.router.navigate(['/tags']);
        } else {
          if (err?.error?.error?.error?.title) {
            this.title.setErrors({ title: err?.error?.error?.error?.title });
          }
        }
      }
    );
  }

  get _id(): AbstractControl {
    return this.tagForm.get('_id');
  }

  get title(): AbstractControl {
    return this.tagForm.get('title');
  }
}
