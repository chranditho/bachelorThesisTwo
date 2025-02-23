import { Test } from '@nestjs/testing';
import { IdeasController } from './ideas.controller';
import { IdeasService } from './ideas.service';
import { CreateIdeaDto } from '@conidea/model';

describe('Ideas Controller', () => {
  let service: IdeasService;
  let controller: IdeasController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [IdeasController],
      providers: [
        {
          provide: IdeasService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                title: 'idea #1',
                description: 'this is the #1 description',
                author: { firstname: 'Mary', lastname: 'Chan' },
                createdAt: new Date('2023-09-30'),
              },
            ]),
            create: jest.fn().mockResolvedValue({
              title: 'idea #1',
              description: 'this is the #1 description',
              createdAt: new Date('2023-09-30'),
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<IdeasController>(IdeasController);
    service = module.get<IdeasService>(IdeasService);
  });

  describe('create', () => {
    it('should create a new idea successfully', async () => {
      const createIdeaDto: CreateIdeaDto = {
        userId: '8700f966-c8fc-442a-adec-0047f1ca572b',
        title: 'Test Title',
        description: 'Test Description',
      };

      const result = await controller.create(createIdeaDto);

      expect(result).toEqual({ message: 'Idea created successfully!' });
    });

    it('should handle validation errors', async () => {
      const createIdeaDto: CreateIdeaDto = {
        userId: 'e34e50a2-1c83-4fd9-90ed-02b5e977ac36',
        title: '',
        description: '',
      };

      try {
        await controller.create(createIdeaDto);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Bad Request: Invalid Idea');
      }
    });

    it('should handle other errors', async () => {
      const createIdeaDto: CreateIdeaDto = {
        userId: '18087201-593a-41a7-87b7-96fac85278dd',
        title: 'Test Title',
        description: 'Test Description',
      };

      jest.spyOn(service, 'create').mockImplementation(() => {
        throw new Error('Some unexpected error');
      });

      try {
        await controller.create(createIdeaDto);
      } catch (error) {
        expect(error.status).toBe(400);
        expect(error.message).toBe('Bad Request: Invalid Idea');
      }
    });
  });
});
