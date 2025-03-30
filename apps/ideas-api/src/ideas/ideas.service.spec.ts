import { Test, TestingModule } from '@nestjs/testing';
import { IdeasService } from './ideas.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IdeaDto, Status, UserDto, UserRole } from '@conidea/model';

const mockUser: UserDto = {
  _id: new Types.ObjectId().toHexString(),
  email: 'mattheu_smothersrb4@accessing.zvm',
  firstname: 'Theodis',
  lastname: 'Bugarin',
  role: UserRole.User,
  isLoggedIn: true,
};

const mockIdea: IdeaDto = {
  _id: new Types.ObjectId().toHexString(),
  title: 'idea',
  description: 'Hello!',
  author: mockUser,
  userId: mockUser._id,
  comments: [
    'Gui implied thought roof lancaster ratios toshiba, density passion controllers oriented bird practices phoenix, counting punishment rolled undertaken discovery requirements wondering, subjects conclude oxide collect mats beneath tier. ',
  ],
  status: Status.Submitted,
  createdAt: new Date('2013-05-04'),
};

describe('Ideas', () => {
  let service: IdeasService;
  let model: Model<IdeaDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeasService,
        {
          provide: getModelToken('Idea'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockIdea),
            constructor: jest.fn().mockResolvedValue(mockIdea),
            find: jest.fn().mockReturnThis(),
            findById: jest.fn().mockReturnThis(), // Mock findById to return itself
            orFail: jest.fn().mockResolvedValueOnce(mockIdea), // Mock orFail
            populate: jest.fn().mockReturnThis(), // Mock populate to return itself
            exec: jest.fn().mockResolvedValueOnce([mockIdea]),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<IdeasService>(IdeasService);
    model = module.get<Model<IdeaDto>>(getModelToken('Idea'));
  });

  it('should return all ideas', async () => {
    const populateSpy = jest.spyOn(model, 'populate').mockReturnThis(); // Mock the populate method
    const ideas = await service.findAll();
    expect(populateSpy).toHaveBeenCalledWith('author');
    expect(ideas).toEqual([mockIdea]);
  });
});

describe('Status', () => {
  let service: IdeasService;
  let model: Model<IdeaDto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IdeasService,
        {
          provide: getModelToken('Idea'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockIdea),
            constructor: jest.fn().mockResolvedValue(mockIdea),
            find: jest.fn().mockReturnThis(),
            findById: jest.fn().mockReturnThis(),
            orFail: jest.fn().mockResolvedValueOnce(mockIdea),
            populate: jest.fn().mockReturnThis(),
            exec: jest
              .fn()
              .mockResolvedValueOnce({ ...mockIdea, status: Status.InReview }),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<IdeasService>(IdeasService);
    model = module.get<Model<IdeaDto>>(getModelToken('Idea'));
  });

  const changeStatusDto = {
    ideaId: 'some-unique-id',
    status: Status.InReview,
  };

  it('should update the status of an idea and return the updated idea', async () => {
    const populateSpy = jest.spyOn(model, 'populate').mockReturnThis(); // Mock the populate method
    const updatedIdea = {
      ...mockIdea,
      status: changeStatusDto.status,
    };
    const result = await service.updateStatus(changeStatusDto);
    expect(populateSpy).toHaveBeenCalledWith('author');
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      changeStatusDto.ideaId,
      { status: changeStatusDto.status },
      { new: true },
    );
    expect(result).toEqual(updatedIdea);
  });
});
