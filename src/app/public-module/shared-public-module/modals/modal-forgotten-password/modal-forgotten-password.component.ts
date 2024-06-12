import { ErrorResponseDto } from "../../../../shared-module/dtos/error-response.dto";
import { HttpStatusCode } from "@angular/common/http";
import { PublicUserService } from "../../../services/public-user.service";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { LanguageManagerService } from "../../../../shared-module/services/language-manager.service";
import { Msg } from "../../../../shared-module/constants/messages.constant";
import { environment as env } from "./../../../../../environments/environment";
import { NewPasswordRequestDto } from "../../dtos/new-password-request.dto";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $: any = window["$"];

@Component({
  selector: "app-modal-forgotten-password",
  templateUrl: "./modal-forgotten-password.component.html",
  styleUrls: ["../../../../../styles.css"],
})
export class ModalForgottenPasswordComponent {
  // RELATING TEMPLATE VARIABLES
  // ==============================================

  // Parent-child communication
  @Output() valueChange = new EventEmitter<string>();
  @Input() email!: string;

  // Miscelleanous
  authenticationCode!: string;
  toasterMsg: string | undefined;
  newPassword!: string;
  confirmedPassword!: string;

  @ViewChild("modal") modal!: ElementRef;
  modalTitle: string =
    Msg.webpage_staticText.modal_change_password.CHANGE_PASSWORD;
  modalPurpose: string =
    Msg.webpage_staticText.modal_change_password
      .AUTHENTICATION_CODE_NEEDED_ON_CHANGE_PASSWORD;

  authenticationCodePath: string =
    Msg.webpage_staticText.modal_change_password.AUTHENTICATION_CODE;
  enterCodePath: string =
    Msg.webpage_staticText.modal_change_password.ENTER_AUTHENTICATION_CODE;
  passwordPath: string = Msg.webpage_staticText.modal_change_password.PASSWORD;
  sendNewPasswordPath: string =
    Msg.webpage_staticText.modal_change_password.SEND;
  enterNewPasswordPath: string =
    Msg.webpage_staticText.modal_change_password.ENTER_NEW_PASSWORD;
  confirmNewPasswordPath: string =
    Msg.webpage_staticText.modal_change_password.CONFIRM_PASSWORD;

  // HTTP
  // ==============================================
  /* Request */
  newPasswordRequestDto!: NewPasswordRequestDto;

  /* Response */
  errorResponseDto!: ErrorResponseDto;

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private publicUserService: PublicUserService,
    private toastr: ToastrService,
    public lang: LanguageManagerService
  ) {}

  // INITIALIZATION (by ngOnInit)
  // ==============================================

  // TEMPLATE CALLBACKS METHODS
  // ==============================================
  openModal(title: string, purpose: string) {
    this.authenticationCode = "";
    this.newPassword="";
    this.confirmedPassword="";

    this.modalTitle = title;
    this.modalPurpose = purpose;
    $(this.modal?.nativeElement).modal("show");
  }

  closeModal() {
    $(this.modal?.nativeElement).modal("hide");
  }

  emitSuccess() {
    this.valueChange.emit("activation success");
  }

  /**
   * Send new password
   *
   * @author atsuhikoMochizuki
   * @since 2024-06-77
   */
  onSendnewPwd() {
    this.newPasswordRequestDto = {
      code: this.authenticationCode,
      email: this.email,
      password: this.newPassword,
    };

    this.publicUserService
      .sendNewPassword(this.newPasswordRequestDto)
      .subscribe(
        
        (response) => {
          if (response.status === HttpStatusCode.Ok) {
            if (response.body) this.toasterMsg = response.body;
            this.toastr.success(
              this.toasterMsg,
              this.lang.pickMsg(Msg.toasts.titles.OPERATION_SUCCESS),
              { timeOut: env.TOASTER_TIMEOUT }
            );
            this.emitSuccess();
          } else {
            this.toastr.error(
              this.lang.pickMsg(Msg.toasts.errors.titles.REQUEST_HAS_FAILED),
              this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
              { timeOut: env.TOASTER_TIMEOUT }
            );
          }
        },

        (error) => {
          this.errorResponseDto = JSON.parse(error.error);
          this.toastr.error(
            this.errorResponseDto.detail,
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: env.TOASTER_TIMEOUT }
          );
        }
      );
  }
}
