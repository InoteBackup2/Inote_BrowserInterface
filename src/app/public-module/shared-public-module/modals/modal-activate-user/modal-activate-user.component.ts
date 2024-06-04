import { ErrorResponseDto } from "./../../../../shared-module/dto/error-response.dto";
import { HttpStatusCode } from "@angular/common/http";
import { PublicUserService } from "./../../../public-user.service";
import { ActivationRequestDto } from "./../../dto/activation-request.dto";
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $: any = window["$"];

@Component({
  selector: "app-modal-component",
  templateUrl: "./modal-activate-user.component.html",
  styleUrls: ["./../../../../shared-module/general-styles.css"],
})
export class ModalActivateUserComponent {
  // RELATING TEMPLATE VARIABLES
  // ==============================================

  // Parent-child communication
  @Output() valueChange = new EventEmitter<string>();

  // Miscelleanous
  activationCode!: string;
  toasterMsg: string | undefined;

  @ViewChild("modal") modal!: ElementRef;
  modalTitle: string = "";
  modalPurpose: string = "";

  // HTTP
  // ==============================================
  /* Request */
  activationRequestBody!: ActivationRequestDto;

  /* Response */
  errorResponseDto!: ErrorResponseDto;
  
  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(
    private PublicUserService: PublicUserService,
    private toastr: ToastrService
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

    this.PublicUserService.activateUser(this.activationRequestBody).subscribe(
      (response) => {
        if (response.status === HttpStatusCode.Ok) {
          if (response.body) this.toasterMsg = response.body;
          this.toastr.success(this.toasterMsg, "Succès de l'opération", {
            timeOut: 5000,
          });
          this.emitSuccess();
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
}
