import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-details',
  templateUrl: './qr-details.component.html',
  styleUrls: ['./qr-details.component.scss']
})
export class QrDetailsComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<QrDetailsComponent>) { }

  ngOnInit(): void {
  }
  onClose() {

    this.dialogRef.close();
  }
}
