import { ErrorResponseDto } from "./../../shared-module/dto/error-response.dto";
import { Component, ViewChild } from "@angular/core";
import type { RegisterRequestDto } from "../shared-public-module/dto/register-request.dto";
import { PublicUserService } from "../public-user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { HttpStatusCode } from "@angular/common/http";
import { ModalActivateUserComponent } from "../shared-public-module/modals/modal-activate-user/modal-activate-user.component";

@Component({
  selector: "app-register-form-component",
  templateUrl: "./register-form.component.html",
  styleUrls: [
    "./register-form.component.css",
    "../../shared-module/general-styles.css",
  ],
})
export class RegisterFormComponent {
  // RELATING TEMPLATE VARIABLES
  // ==============================================

  // @ViewChild retrieves a reference to one of the component's child elements, and provides access to its methods
  @ViewChild(ModalActivateUserComponent) modal!: ModalActivateUserComponent;
  // operationSuccess!: boolean;
  username!: string;
  password!: string;
  pseudonyme!: string;
  activation_success: boolean = false;
 
  // HTTP
  // ==============================================
  /* Request */
  registerRequestBody!: RegisterRequestDto;
  // activationRequestBody!: ActivationRequestDto;

  /* Response */
  // registerResponseBody!: string | null;
  // registerResponseStatus!: number;
  // activationResponseBody!: string | null;
  // activationResponseStatus!: number;

  errorResponseDto!: ErrorResponseDto;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================

  constructor(
    private publicUserService: PublicUserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  actOnSuccessEmitedByChild(value: string) {
    if (value === "activation success") {
      this.closeModal();
      this.activation_success = true;
    }
  }

  openModal() {
    this.modal.openModal(
      "Activation du compte",
      `Veuillez saisir ci-dessous le code d'activation qui vous a été envoyé sur votre adresse ${this.username}`
    );
  }

  closeModal() {
    this.modal.closeModal();
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
      (response) => {
        if (response.status === HttpStatusCode.Created) {
          this.openModal();
        } else {
          this.toastr.warning("La requête a echouée", "Anomalie détectée", {
            timeOut: 5000,
          });
        }
      },

      (error) => {
        this.errorResponseDto = JSON.parse(error.error);
        this.toastr.error(this.errorResponseDto.detail, "Anomalie détectée", {
          timeOut: 5000,
        });
      }
    );
  }

  // NAVIGATION
  // ==============================================
  onGoToHome() {
    this.router.navigate(["home"]);
  }

  onLogin() {
    this.router.navigate(["login"]);
  }
}
