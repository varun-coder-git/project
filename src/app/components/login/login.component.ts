import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminLoginForm: FormGroup;
  submitted = false;
  hide = true;
  editable = true;
  editableOTP = false;
  constructor(private service: ApiService, private toastr: ToastrService,private router: Router,) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.adminLoginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(30)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      'OTP': new FormControl({ value: '', disabled: true }, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),


    });
    // this.adminLoginForm.controls['OTP'].disable();
  }
  // get f() { return this.adminLoginForm.controls; }
  generateAccessCode() {


    let obj = {
      'email': this.adminLoginForm.controls['email'].value
    }
    this.service.generateAccessCode(obj).subscribe((res) => {
      this.editable = false; this.editableOTP = true;
      this.adminLoginForm.controls['OTP'].enable();
      this.toastr.success('Access Code Sent to your mailbox!');

    },
      err => {
        if(err == "OTP doesn't match!!!"){
          this.toastr.error("Generate code doesn't match!");
        }
        else if(err == "Invalid credentials."){
         
            this.toastr.error("Invalid Credentials!!");
          
        }
        this.toastr.error('Oops...Something went wrong!');
      }
    );
  }
  getErrorMessageEmail() {
    if (this.adminLoginForm.controls['email'].hasError('required')) {
      return 'Email Address is required!';
    }

    return this.adminLoginForm.controls['email'].hasError('email') ? 'Please enter valid email!' : '';
  }
  getErrorMessagePassword() {
    if (this.adminLoginForm.controls['password'].hasError('required')) {
      return 'Password is required!';
    }
    if (this.adminLoginForm.controls['password'].hasError('maxlength')) {
      return 'Password Should not be greater than 15 characters!';
    }
    return this.adminLoginForm.controls['password'].hasError('minlength') ? 'Password Should not be less than 8 characters!' : '';
  }
  getErrorMessageOTP() {
    if (this.adminLoginForm.controls['OTP'].hasError('maxlength')) {
      return 'Please Enter 6-digit OTP!';
    }
    if (this.adminLoginForm.controls['OTP'].hasError('minlength')) {
      return 'Please Enter 6-digit OTP!';
    }
    return this.adminLoginForm.controls['OTP'].hasError('required') ? 'Please Enter 6-digit OTP!' : '';
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.adminLoginForm.value);
    // console.log(this.adminLoginForm.controls.rememberMe.value);
    // let username=this.adminLoginForm.controls.email.value;
    // let password=this.adminLoginForm.controls.password.value;
    // let rememberMe=this.adminLoginForm.controls.rememberMe.value;





    //this.cookieService.set('isLoggedin',this.adminLoginForm.controls.rememberme.value);
    if (this.adminLoginForm.invalid) {

      this.toastr.warning('Please enter Email & Password!');
      return;
    }
    else {
      this.service.adminLogin(this.adminLoginForm.value).subscribe((res) => {


        if (res.status == true) {

          localStorage.setItem('userID', res.data.user_id);
          localStorage.setItem('userToken', res.data.token);
           localStorage.setItem('userName', res.data.name);
           localStorage.setItem('profilePicture', res.data.profilePicture);
     
          this.router.navigate(['/dashboard']);
          this.toastr.success('Login Successful!');
          // this.adminLoginForm.markAsPristine();
          // this.adminLoginForm.markAsUntouched();



        }

      },
      err => {
        if(err == "OTP doesn't match!!!"){
          this.toastr.error("Generate code doesn't match!");
        }
        else if(err == "Invalid credentials."){
         
            this.toastr.error("Invalid Credentials!!");
          
        }
        else
        this.toastr.error('Oops...Something went wrong!');
      }
      
      );
    }
    this.adminLoginForm.markAsPristine();
    this.adminLoginForm.markAsUntouched();
    this.adminLoginForm.updateValueAndValidity();
  }

}
