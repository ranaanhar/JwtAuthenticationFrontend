import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function formValidation(firstControlName:string,secondControlName:string):ValidatorFn{
    return(formGroup:AbstractControl):ValidationErrors|null=>{
      var pass=formGroup.get(firstControlName);
      var confirm=formGroup.get(secondControlName);
  
      if (!(pass&&confirm)) {
        return null;
      }
  
      if (confirm.errors) {
        return null;
      }
  
      if (confirm.value !==pass.value) {
        confirm.setErrors({missmatch:true});
        return {missmatch:true};
      }else{
        confirm.setErrors(null);
        return null;
      }
    }
  }