import { Component, OnInit } from '@angular/core';
import { Entrie, Response } from 'src/app/interfaces';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-all-entries',
  templateUrl: './all-entries.component.html',
  styleUrls: ['./all-entries.component.scss'],
})
export class AllEntriesComponent implements OnInit {
  public entries: Entrie[] = [];

  constructor(private entriesService: EntriesService) {}

  ngOnInit(): void {
    this.entriesService.getAllEntries().subscribe((a: Response) => {
      this.entries = a.data;
    });
  }
}
