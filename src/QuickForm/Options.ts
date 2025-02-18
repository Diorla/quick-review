export type Options = {
  titleStyle?: Record<string, string | number>;
  formStyle?: Record<string, string | number>;
  commentStyle?: Record<string, string | number>;
  starWrapperStyle?: Record<string, string | number>;
  starStyle?: Record<string, string | number>;
  buttonWrapperStyle?: Record<string, string | number>;
  submitStyle?: Record<string, string | number>;
  cancelStyle?: Record<string, string | number>;
  /**
   * triggered when the submit button is clicked
   * @returns
   */
  onSubmit?: () => void;
  /**
   * triggered when the cancel button is clicked
   * @returns
   */
  onCancel?: () => void;
  /**
   * triggered when the feedback is submitted successfully
   * @returns
   */
  onSuccess?: () => void;
  /**
   * triggered when an error occurs
   * @returns
   */
  onError?: () => void;
};

export default Options;
