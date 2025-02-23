import MockAdapter from 'axios-mock-adapter';
import { CreateIdeaDto, Idea } from '@conidea/model';
import axios, { AxiosResponse } from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:3000/api';

describe('error handling', () => {
  let response: AxiosResponse;
  const mock = new MockAdapter(axios);

  it('should handle bad request error', async () => {
    const data: CreateIdeaDto = {
      userId: 'd0a66ac4-7789-444a-a9c4-8ca43ef05c8d',
      title: '', // Invalid title
      description: 'Short description', // Invalid description
    };

    const expectedErrorMessage =
      'Bad Request: title should not be empty, description should not be empty';

    mock
      .onPost(`${apiUrl}/ideas/new`, data)
      .reply(400, { message: expectedErrorMessage, statusCode: 400 });

    try {
      response = await axios.post<Idea>(`${apiUrl}/ideas/new`, data);
    } catch (error) {
      response = error.response;
    }

    expect(response.status).toBe(400);
    expect(response.data.message).toBe(expectedErrorMessage);
  });
});
