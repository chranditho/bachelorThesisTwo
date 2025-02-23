import axios, { AxiosResponse } from 'axios';
import { CreateIdeaDto, Idea } from '@conidea/model';
import { Types } from 'mongoose';

const apiUrl = process.env.API_URL || 'http://localhost:3000/api';

describe('POST api/ideas/new', () => {
  let response: AxiosResponse<{ message: string }>;

  const userId = new Types.ObjectId('65abb707d24f809e1b520b64').toHexString();

  it('should create a new idea and return it', async () => {
    const data: CreateIdeaDto = {
      title: 'new idea',
      description: 'the most amazing idea!',
      userId,
    };

    response = await axios.post<{ message: string }>(
      `${apiUrl}/ideas/new`,
      data
    );
    expect(response.status).toBe(201);
    expect(response.data.message).toBe('Idea created successfully!');
  });
});

describe('GET /api/ideas', () => {
  let response: AxiosResponse<Idea[]>;

  beforeAll(async () => {
    response = await axios.get<Idea[]>(`${apiUrl}/ideas`);
  });

  it('should return a 200 status code', () => {
    expect(response.status).toBe(200);
  });

  it('should have a well-defined response structure', () => {
    expect(response.data).toBeDefined();
    const ideas = response.data;
    if (ideas) {
      expect(Array.isArray(ideas)).toBeTruthy();
    }
  });

  it('should return at least one idea', () => {
    const ideas = response.data ? response.data : [];
    if (ideas) {
      expect(ideas.length).toBeGreaterThan(0);
    }
  });

  it('each idea should have specific properties', () => {
    if (response.data) {
      const ideas = response.data;
      if (ideas && ideas.length > 0) {
        const firstIdea = ideas[0];
        expect(firstIdea).toHaveProperty('_id');
        expect(firstIdea).toHaveProperty('title');
        expect(firstIdea).toHaveProperty('description');
        expect(firstIdea).toHaveProperty('createdAt');
      }
    }
  });

  it('each idea should have specific properties', () => {
    if (response.data) {
      const ideas = response.data;
      if (ideas && ideas.length > 0) {
        const firstIdea = ideas[ideas.length - 1];
        expect(firstIdea._id).toBeDefined();
        expect(firstIdea.title).toEqual('new idea');
        expect(firstIdea.description).toEqual('the most amazing idea!');
        expect(firstIdea.author).toBeDefined();
        expect(firstIdea.createdAt).toBeDefined();
      }
    }
  });
});
