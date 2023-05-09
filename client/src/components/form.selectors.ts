import { FormState } from '../store';
export const userDataSelector = (state: FormState) => state.formData.user;
export const userAuthSelector = (state: FormState) => state.formData.isOuth;
export const userErrorsSelector = (state: FormState) => state.formData.errors;
export const isLoadingSelector = (state: FormState) => state.formData.isLoading;
