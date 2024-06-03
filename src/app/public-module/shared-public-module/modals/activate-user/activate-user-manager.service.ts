import { Injectable } from '@angular/core';
import { ActivateUserStepsEnum } from './activate-user-steps.enum';

@Injectable({
  providedIn: 'root'
})
export class ActivateUserManagerService {
  inProgess!:boolean;
  currentStep:ActivateUserStepsEnum = ActivateUserStepsEnum.INIT;

  constructor() { }
  
  getCurrentStep():ActivateUserStepsEnum{
    return this.currentStep;
  }

  setCurrentStep(stepToSet:ActivateUserStepsEnum):void{
    this.currentStep = stepToSet;
  }

  isInProgress(){
    return this.inProgess;
  }

  setInProgress(value:boolean){
    this.inProgess=value;
  }
}

