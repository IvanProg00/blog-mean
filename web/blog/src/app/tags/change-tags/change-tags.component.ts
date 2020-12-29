import { HttpErrorResponse } from '@angular/common/http';
import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChangeTag, Response } from 'src/app/interfaces';
import { UserService } from 'src/app/user/user.service';
import { MESSAGE_DURATION, ROOT_PRIVELEGES } from 'src/assets/config';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-change-tags',
  templateUrl: './change-tags.component.html',
  styleUrls: ['./change-tags.component.scss'],
})
export class ChangeTagsComponent implements OnInit {
  public error: string = '';
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
    private _snackBar: MatSnackBar
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
          this.router.navigate(['/']);
          return;
        }
        this.activatedRoute.params.subscribe((params: Params) => {
          this.setTag(params.id);
        });
      },
      (err: HttpErrorResponse) => {
        console.error(err);
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
      (res: Response) => {
        this.router.navigate(['/tags']);
        this._snackBar.open('Tag Changed', undefined, {
          duration: MESSAGE_DURATION,
        });
      },
      (err: HttpErrorResponse) => {
        console.error(err);
        this.router.navigate(['/tags']);
        this._snackBar.open("You can't change this tag", undefined, {
          duration: MESSAGE_DURATION,
        });
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
