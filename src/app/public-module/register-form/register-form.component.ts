import { ErrorResponseDto } from "./../../shared-module/dto/error-response.dto";
import { ActivationRequestDto } from "./../shared-public-module/dto/activation-request.dto";
import { Component, OnInit, ViewChild } from "@angular/core";
import type { RegisterRequestDto } from "../shared-public-module/dto/register-request.dto";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { ActivateUserManagerService } from "../shared-public-module/modals/activate-user/activate-user-manager.service";
import { ActivateUserStepsEnum } from "../shared-public-module/modals/activate-user/activate-user-steps.enum";
import { ToastrService } from 'ngx-toastr';
import { ModalComponentComponent } from "../shared-public-module/modals/modal-component/modal-component.component";
import { HttpStatusCode } from "@angular/common/http";



@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form.component.html",
  styleUrls: [
    "./register-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class RegisterFormComponent implements OnInit {
  // @ViewChild retrieves a reference to one of the component's child elements, and provides access to its methods
  @ViewChild(ModalComponentComponent) modal!: ModalComponentComponent;

  operationSuccess!: boolean;
  
  openModal(){
    this.modal.openModal("Activation du compte",
    `Veuillez saisir ci-dessous le code d'activation qui vous a été envoyé sur votre adresse ${this.username}`);
  }
 
   closeModal(){
     this.modal.closeModal();
   }
  
  // RELATING TEMPLATE VARIABLES
  // ==============================================
  username!: string;
  password!: string;
  pseudonyme!: string;
  activationcode!: string;
  registering_success: boolean = false;
  activation_success: boolean = false;
  registerResponseMsgToDisplay!: string | null;
  activationResponseMsgToDisplay!: string | null;
  errorMsgToSend!: string;
  globalSuccessState!: boolean;
  inProgress!: boolean;
  modalIsVisible: boolean=false;

  errorDetected!:boolean;

  

  // HTTP
  // ==============================================
  /* Request */
  registerRequestBody!: RegisterRequestDto;
  activationRequestBody!: ActivationRequestDto;

  /* Response */
  registerResponseBody!: string | null;
  registerResponseStatus!: number;
  activationResponseBody!: string | null;
  activationResponseStatus!: number;

  errorResponseDto!: ErrorResponseDto;
  activateUserStep!: ActivateUserStepsEnum;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  
  constructor(
    private publicUserService: PublicUserService,
    private router: Router,
    private activateUserManagerService: ActivateUserManagerService,
    private toastr: ToastrService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================
  ngOnInit(): void {
    this.errorDetected=false;
    this.activateUserStep = ActivateUserStepsEnum.SEND_AUTH_CODE;
   
  }
  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  handleValueChange(value: string) {
    if(value==='activation success'){
      this.closeModal();
      this.activation_success=true;
    }
    
  }
  
  
  /**
   * Register a new user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSubmitRegister() {
    this.closeModal();
    
    
    this.registerRequestBody = {
      pseudo: this.pseudonyme,
      username: this.username,
      password: this.password,
    };

    this.publicUserService.addUser(this.registerRequestBody).subscribe(
      // Response case
      (response) => {
        if (response.status === HttpStatusCode.Created){
          // this.activateUserStep=ActivateUserStepsEnum.SEND_AUTH_CODE;
          this.openModal();
         
        }
          
        else{
          // this.modalIsVisible=false;
          this.toastr.warning("La requête a echouée","Anomalie détectée",{"timeOut":5000});
        }
        
      },

      // Error case
      (error) => {
       this.errorResponseDto = JSON.parse(error.error);
        this.toastr.error(this.errorResponseDto.detail, "Anomalie détectée",{"timeOut":5000});
        
      }
    );
  }

 

  

  onCloseModal() {
    this.activateUserManagerService.setCurrentStep(ActivateUserStepsEnum.INIT);
    this.modalIsVisible=false;
  }

  /**
   * Navigate to landing page
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onGoToHome() {
    this.router.navigate(["home"]);
  }

  onLogin() {
    this.router.navigate(["login"]);
  }
}
