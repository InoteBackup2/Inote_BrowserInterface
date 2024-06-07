import { ErrorResponseDto } from "../../../../shared-module/dtos/error-response.dto";
import { HttpStatusCode } from "@angular/common/http";
import { PublicUserService } from "../../../services/public-user.service";
import { ActivationRequestDto } from "../../dtos/activation-request.dto";
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
import { AppProperties } from "./../../../../app.properties";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $: any = window["$"];

@Component({
  selector: "app-modal-component",
  templateUrl: "./modal-activate-user.component.html",
  styleUrls: ["../../../../../styles.css"],
})
export class ModalActivateUserComponent {
  // RELATING TEMPLATE VARIABLES
  // ==============================================

  // Parent-child communication
  @Output() valueChange = new EventEmitter<string>();
  @Input() email!:string;
  
  // Miscelleanous
  activationCode!: string;
  toasterMsg: string | undefined;

  @ViewChild("modal") modal!: ElementRef;
  modalTitle: string = "";
  modalPurpose: string = "";

  

  authenticationCodePath:string=Msg.webpage_staticText.modal_activate_user.AUTHENTICATION_CODE;
  enterCodePath:string=Msg.webpage_staticText.modal_activate_user.ENTER_AUTHENTICATION_CODE;
  sendCodePath:string=Msg.webpage_staticText.modal_activate_user.SEND_AUTHENTICATION_CODE;

  // HTTP
  // ==============================================
  /* Request */
  activationRequestBody!: ActivationRequestDto;

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
    this.activationCode = "";
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
   * Activate the newly created user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSendAuthCode() {
    this.activationRequestBody = {
      code: this.activationCode,
    };

    this.publicUserService.activateUser(this.activationRequestBody).subscribe(
      (response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.body) this.toasterMsg = response.body;
          this.toastr.success(
            this.toasterMsg,
            this.lang.pickMsg(Msg.toasts.titles.OPERATION_SUCCESS),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
          this.emitSuccess();
        } else {
          this.toastr.warning(
            this.lang.pickMsg(Msg.toasts.errors.titles.REQUEST_HAS_FAILED),
            this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
            { timeOut: AppProperties.TOASTER_TIMEOUT }
          );
        }
      },

      (error) => {
        this.errorResponseDto = JSON.parse(error.error);
        this.toastr.error(
          this.errorResponseDto.detail,
          this.lang.pickMsg(Msg.toasts.errors.titles.DETECTED_ANOMALY),
          { timeOut: AppProperties.TOASTER_TIMEOUT }
        );
      }
    );
  }
}
