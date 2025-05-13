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
        title: 'Test Title',
        description: 'Test Description',
        author: {
          userId: '',
          name: '',
        },
      };

      const result = await controller.create(createIdeaDto);

      expect(result).toEqual({ message: 'Idea created successfully!' });
    });

    it('should handle validation errors', async () => {
      const createIdeaDto: CreateIdeaDto = {
        title: '',
        description: '',
        author: {
          userId: '',
          name: '',
        },
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
        title: 'Test Title',
        description: 'Test Description',
        author: {
          userId: '',
          name: '',
        },
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
