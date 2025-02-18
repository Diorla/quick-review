export default interface FeedbackData {
  rating: number;
  comment: string;
  apiKey: string;
  params?: Record<string, string>;
}
