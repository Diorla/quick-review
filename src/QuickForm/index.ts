import { apiUrl } from "../fetchSurvey/apiUrl";
import fetchSurvey from "../fetchSurvey";
import SurveyType from "../fetchSurvey/SurveyType";
import createForm from "./createForm";
import getStyles from "./getStyles";
import Options from "./Options";

export interface FeedbackData {
  rating: number;
  comment: string;
  apiKey: string;
}

export default class QuickForm {
  private static apiKey: string;
  private static survey: SurveyType | null = null;

  static async init(apiKey: string): Promise<void> {
    this.apiKey = apiKey;

    try {
      const res = await fetchSurvey(apiKey);
      if (res.data) this.survey = res.data;
      if (res.error) console.error(res.error);
    } catch (error) {
      console.error("Failed to fetch survey:", error);
    }
  }

  private static getClsStyles(options?: Options): Record<string, string> {
    return getStyles(options);
  }

  private static createFormHTML(styles: Record<string, string>): string {
    return createForm(styles, this.survey?.question || "");
  }

  private static attachEventListeners(
    selector: string,
    options?: Options
  ): void {
    const { onCancel, onError, onSubmit, onSuccess } = options || {};
    const container = document.querySelector(selector);
    if (!container) return;

    // Star rating event listener
    const starsElement = document.querySelector("#quick-review-stars");
    starsElement?.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "SPAN") {
        const value = parseInt(target.getAttribute("data-value") || "0");
        const stars = document.querySelectorAll("#quick-review-stars span");
        stars.forEach((star) => {
          const starValue = parseInt(star.getAttribute("data-value") || "0");
          star.textContent = starValue <= value ? "★" : "☆";
        });
      }
    });

    // Submit button event listener
    const submitButton = document.querySelector("#quick-review-submit");
    submitButton?.addEventListener("click", async () => {
      if (onSubmit) onSubmit();

      const stars = document.querySelectorAll("#quick-review-stars span");
      const rating = Array.from(stars).filter(
        (star) => star.textContent === "★"
      ).length;

      const commentElement = document.querySelector(
        "#quick-review-comment"
      ) as HTMLTextAreaElement;
      const comment = commentElement?.value || "";

      if (rating === 0) {
        alert("Please select a rating");
        return;
      }

      try {
        const result = await this.submitFeedback({
          rating,
          comment,
          apiKey: this.apiKey,
        });
        if (result.success) {
          onSuccess
            ? onSuccess()
            : this.showSuccessPage(selector, this.getClsStyles(options));
        } else {
          onError
            ? onError()
            : this.showFailurePage(selector, this.getClsStyles(options));
        }
      } catch (error) {
        onError
          ? onError()
          : this.showFailurePage(selector, this.getClsStyles(options));
      }
    });

    // Cancel button event listener
    const cancelButton = document.querySelector("#quick-review-cancel");
    cancelButton?.addEventListener("click", () => {
      if (onCancel) onCancel();
    });
  }

  private static async submitFeedback(
    data: FeedbackData
  ): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${apiUrl}/send_feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return { success: response.ok };
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      return { success: false };
    }
  }

  private static showSuccessPage(
    selector: string,
    styles: Record<string, string>
  ): void {
    const successPage = `<div style="${styles.form}">
      <h3 style="${styles.title}">Thank you for your feedback!</h3>
      <p style="margin-top: 12px;">Your feedback has been submitted successfully.</p>
    </div>`;

    const container = document.querySelector(selector);
    if (container) container.innerHTML = successPage;
  }

  private static showFailurePage(
    selector: string,
    styles: Record<string, string>
  ): void {
    const failurePage = `<div style="${styles.form}">
      <h3 style="${styles.title}">Oops! Something went wrong.</h3>
      <p style="margin-top: 12px;">Please try again later.</p>
    </div>`;

    const container = document.querySelector(selector);
    if (container) container.innerHTML = failurePage;
  }

  static render(selector: string, options?: Options): void {
    const container = document.querySelector(selector);
    if (!container) {
      console.error(`Element with selector "${selector}" not found.`);
      return;
    }

    const styles = this.getClsStyles(options);
    container.innerHTML = this.createFormHTML(styles);
    this.attachEventListeners(selector, options);
  }

  static destroy(selector: string): void {
    const container = document.querySelector(selector);
    if (container) container.innerHTML = "";
  }

  static restore(selector: string, options: Options): void {
    this.render(selector, options);
  }
}
