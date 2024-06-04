import { ErrorResponseDto } from './../../../../shared-module/dto/error-response.dto';
import { HttpStatusCode } from '@angular/common/http';
import { PublicUserService } from './../../../public-user.service';
import { ActivationRequestDto } from './../../dto/activation-request.dto';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const $: any = window['$']
@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ["./../../../../shared-module/general-styles.css"]
})
export class ModalComponentComponent {
  @Output() valueChange = new EventEmitter<string>();

  emitSuccess() {
    this.valueChange.emit('activation success');
  }

  activationRequestBody!: ActivationRequestDto;
  activationCode!:string;

  activationSuccess!:boolean;
  errorResponseDto!: ErrorResponseDto;
  toasterMsg:string|undefined;

  constructor(private PublicUserService: PublicUserService,private toastr: ToastrService){}
  /**
   * Activate the newly created user account
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  onSendAuthCode() {
   
    // Dto creation if needed
    this.activationRequestBody = {
      code: this.activationCode,
    };

    this.PublicUserService.activateUser(this.activationRequestBody).subscribe(
      // Response case
      (response) => {
        // Response treatement
        if (response.status === HttpStatusCode.Ok)
        {
          this.activationSuccess=true;
          if(response.body)
            this.toasterMsg = response.body;
          this.emitSuccess();
          this.toastr.success(this.toasterMsg,"Succès de l'opération",{"timeOut":5000});
         

        } else {
          this.activationSuccess=false;
          this.toastr.warning("La requête a echouée","Anomalie détectée",{"timeOut":5000});
        }
      },

      // Error case
      (error) => {
        this.errorResponseDto = JSON.parse(error.error);
        this.toastr.error(this.errorResponseDto.detail,"Anomalie détectée",{"timeOut":5000});
        // this.activationResponseStatus = error.status;
        // this.activationResponseMsgToDisplay = error.error.msg;
        // this.inProgress = false;
        // return throwError(error);
      }
    );
  }

onCloseModal() {
throw new Error('Method not implemented.');
}

// Contenu général
  @ViewChild('modal') modal?: ElementRef;
  title: string = '';
  modalPurpose: string = '';


  openModal(title: string, modalPurpose: string) {
    this.activationCode = '';
    this.activationSuccess=false;
    this.title = title;
    this.modalPurpose = modalPurpose;
    $(this.modal?.nativeElement).modal('show');

  }

  closeModal() {

    $(this.modal?.nativeElement).modal('hide');
  }

  
}
