import { apiUrl } from './apiUrl';
import mockResponse from './mockResponse';
import SurveyType from './SurveyType';

export default async function fetchSurvey(
  apiKey?: string
): Promise<{ data: SurveyType | null; error: Error | null }> {
  try {
    if (!apiKey) {
      if (process.env.NODE_ENV === 'production')
        throw new Error('No API key provided');
      return { data: mockResponse, error: new Error('No API key provided') };
    }
    const survey = await fetch(`${apiUrl}/endpoint/${apiKey}`);

    const data: SurveyType | null =
      ((survey.json() as unknown) as SurveyType) || null;

    return { data, error: null };
  } catch (err) {
    const error = err as Error;
    return { data: null, error };
  }
}
