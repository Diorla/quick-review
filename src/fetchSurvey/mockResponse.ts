const mockResponse = {
  id: 1,
  api_key: 'b06cdef-2def-4a6b-a13b-7bb79f84d885',
  title: 'Quick Feedback',
  description: 'This is a test feedback form',
  question: 'What do you think of this test feedback?',
  params: {
    form: 'feedback',
    rating: '5',
  },
  category: 'form',
  image_url: 'form',
  closed_at: new Date().toISOString(),
  published_at: new Date().toISOString(),
};

export default mockResponse;
