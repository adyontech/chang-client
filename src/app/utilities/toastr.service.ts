import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastrService {
  constructor(public toastr: ToastsManager) {}

  // Success Type
  typeSuccess(first, second) {
    this.toastr.success(second , first);
  }

  // Success Type
  typeInfo(first, second) {
    this.toastr.info(first, second);
  }

  // Success Type
  typeWarning(first) {
    this.toastr.warning(first);
  }

  // Success Type
  typeError(first, second) {
    this.toastr.error(first, second);
  }

  // Custom Type
  typeCustom() {
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

  // Timeout
  timeout() {
    this.toastr.error('I do not think that word means what you think it means.', 'Timeout!', { toastLife: 2000 });
  }

  // Dismiss toastr on Click
  dismissToastOnClick() {
    this.toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort', { dismiss: 'click' });
  }
  // Dismiss Toast controlled code
  dismissToastControlled() {
    this.toastr.success('You are awesome!', 'Success!', { dismiss: 'controlled' }).then(toast => {
      setTimeout(() => {
        this.toastr.dismissToast(toast);
      }, 10000);
    });
  }
  // Remove current toasts using animation
  clearToast() {
    this.toastr.clearAllToasts();
  }

  // Show close button
  showCloseButton() {
    this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { showCloseButton: true });
  }
  // Enable  HTML
  enableHtml() {
    this.toastr.info('<i>Have fun <b>storming</b> the castle!</i>', 'Miracle Max Says', { enableHTML: true });
  }
  // Title Class
  titleClass() {
    this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { titleClass: 'h3' });
  }
  // Message Class
  messageClass() {
    this.toastr.info('Have fun storming the castle!', 'Miracle Max Says', { messageClass: 'text-uppercase' });
  }
}
