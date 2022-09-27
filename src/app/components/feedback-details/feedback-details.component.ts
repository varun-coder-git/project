import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
  styleUrls: ['./feedback-details.component.scss']
})
export class FeedbackDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<FeedbackDetailsComponent>) { }

  ngOnInit(): void {
  }
  onClose() {

    this.dialogRef.close();
  }

}
