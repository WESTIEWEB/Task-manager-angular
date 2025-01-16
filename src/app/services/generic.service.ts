import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor() {}

  isLocalStorageDefined(): boolean {
    return typeof localStorage !== 'undefined';
  }

  getItemFromLocalStorage(key: string): string | undefined | unknown {
    try {
      if (this.isLocalStorageDefined()) {
        return localStorage.getItem(key);
      } else return undefined;
    } catch (error) {
      console.warn(error);
      return undefined;
    }
  }

  showAlert(type: 'error' | 'success' | 'warn', message: string): void {
    const icon = type === 'warn' ? 'warning' : type; 
    const title =
      type === 'success'
        ? 'Success!'
        : type === 'error'
        ? 'Error!'
        : 'Warning!';

    Swal.fire({
      title,
      text: message,
      icon: icon as any,
      confirmButtonText: 'OK',
    });
  }

  showDeleteConfirmation(
    title: string,
    message: string,
    onConfirm: () => void
  ): void {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Execute the callback if user confirms
        onConfirm();
        Swal.fire('Deleted!', 'Your action has been confirmed.', 'success');
      }
    });
  }
}
