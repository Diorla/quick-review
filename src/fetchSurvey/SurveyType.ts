export type SurveyType = {
  id: number;
  api_key: string;
  title: string;
  description: string;
  question: string;
  params: {
    form: string;
    rating: string;
  };
  category: string;
  image_url: string;
  closed_at: string;
  published_at: string;
};

export default SurveyType;
