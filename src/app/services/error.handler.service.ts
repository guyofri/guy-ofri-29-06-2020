import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
//import { AppSettings } from '../../app.settings';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  public handleError(error: any) {

    const router = this.injector.get(Router);
  //  const settings = this.injector.get(AppSettings)

    const toastr = this.injector.get(ToastrService);

    console.log(`Request URL: ${router.url}`);
    console.log(error);
    if (error instanceof HttpErrorResponse) {
      console.log("it is");
      if (error.status === 401) {
        router.navigate(['/login']);
     //   settings.settings.setLoadingSpinner(false);
        toastr.error('Logged in user no longer authenticated on server.', 'Unable to connect to server');
      } else if (error.status === 404) {
        console.log("it is 404");
        toastr.error('Unable to connect to server. Missing or wrong URL, please try again', 'Unable to connect to server');
    //    settings.settings.setLoadingSpinner(false);
      } else if (error.status === 0) {
        toastr.error('Server appears to be temporary unavailable', 'Unable to connect to server');
   //     settings.settings.setLoadingSpinner(false);
      } else if (error.status === 500) {
        toastr.error('Server appears to be temporary unavailable', 'Unable to connect to server');
   //     settings.settings.setLoadingSpinner(false);
      }

    } else {
      console.error(error);
      toastr.error('An error has occured', 'Sorry');

    }

  }

}
