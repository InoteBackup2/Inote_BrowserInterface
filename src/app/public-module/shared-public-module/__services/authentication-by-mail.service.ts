import { Injectable } from '@angular/core';
import { AuthenticationByMailSteps } from '../__enums/authentication-by-mail.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationByMailService {

  currentStep:AuthenticationByMailSteps = AuthenticationByMailSteps.INIT;

  constructor() { }
  
  getCurrentStep():AuthenticationByMailSteps{
    return this.currentStep;
  }

  setCurrentStep(stepToSet:AuthenticationByMailSteps):void{
    this.currentStep = stepToSet;
  }
}
