import { Injectable } from '@angular/core';
import { Steps } from './steps.enum';

@Injectable({
  providedIn: 'root'
})
export class EngineStepService {

  currentStep:Steps = Steps.INIT;

  constructor() { }
  
  getCurrentStep():Steps{
    return this.currentStep;
  }

  setCurrentStep(stepToSet:Steps):void{
    this.currentStep = stepToSet;
  }
}
