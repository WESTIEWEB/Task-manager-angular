import { Injectable } from "@angular/core";
import swal from "sweetalert";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class GenericService {
    constructor() {}

    isLocalStorageDefined(): boolean {
        if (typeof localStorage !== 'undefined') {
            return true
        } else return false
    }

    getItemFromLocalStorage(key: string): string | undefined | unknown {
        try {
            if(this.isLocalStorageDefined()) {
                return localStorage.getItem(key);
            } else return undefined
        } catch (error) {
            console.warn(error)
            return undefined;
        }
    }

    showAlert(type: 'error' | 'success' | 'warn', message: string) {
        const alertOptions: { title: string; icon: string; text: string } = {
          title: '',
          icon: '',
          text: message
        };
    
        // Set title and icon based on alert type
        switch (type) {
          case 'success':
            alertOptions.title = 'Success!';
            alertOptions.icon = 'success';
            break;
          case 'error':
            alertOptions.title = 'Error!';
            alertOptions.icon = 'error';
            break;
          case 'warn':
            alertOptions.title = 'Warning!';
            alertOptions.icon = 'warning';
            break;
          default:
            alertOptions.title = 'Notice';
            alertOptions.icon = 'info';
            break;
        }
    
        // Display SweetAlert
        swal(alertOptions.title, alertOptions.text, alertOptions.icon as any);
      }


      showDeleteConfirmation(
        title: string,
        message: string,
        onConfirm: () => void
      ): void {
        swal({
          title,
          text: message,
          icon: 'warning',
          buttons: ['Cancel', 'Delete'],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            // Execute the callback if user confirms
            onConfirm();
          } else {
            // Optional: Show an alert if the action is canceled
            return
          }
        });
      }
      
}