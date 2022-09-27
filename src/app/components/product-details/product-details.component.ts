import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductDetailsComponent>) { }

  ngOnInit(): void {
  }
  onClose() {

    this.dialogRef.close();
  }
}
