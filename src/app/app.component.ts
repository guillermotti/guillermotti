import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
declare var $: any;

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  name: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';
  recaptcha: boolean = false;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, '') ===
        this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        let target = $(this.hash);
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            'easeInOutExpo'
          );
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
      $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#sideNav'
    });
  }

  sendEmail() {
    this.http.post('https://us-central1-guillermotti.cloudfunctions.net/email/contact', {
      name: this.name,
      phone: this.phone,
      email: this.email,
      message: this.message
    }).subscribe(() => {

    });
  }

  buttonDisabled() {
    if (this.name === '' || this.email === '' || this.phone === '' || this.message === '' || !this.emailFormControl.valid || !this.recaptcha) {
      return true;
    } else {
      return false;
    }
  }

  //function to resolve the reCaptcha and retrieve a token
  async resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.http.post("https://us-central1-guillermotti.cloudfunctions.net/recaptcha/validate", {recaptcha: captchaResponse}).subscribe(res => {
      if (res) {
        this.recaptcha = true;
      }
    });
  }
}
