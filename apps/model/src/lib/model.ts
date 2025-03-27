export function model(): string {
  return 'model';
}

export interface Idea extends CreateIdeaDto {
  _id: string;
  author: UserDto;
  status: Status;
  comments: string[];
  createdAt: Date;
}

export interface CreateIdeaDto {
  title: string;
  description: string;
  userId: string;
}

export interface ChangeStatusDto {
  ideaId: string;
  status: Status;
}

export interface CreateCommentDto {
  ideaId: string;
  comment: string;
}

export enum Status {
  Submitted = 'Submitted',
  InReview = 'In Review',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Finished = 'Finished',
}

export enum UserRole {
  User = 'User',
  Reviewer = 'Reviewer',
}

export interface UserDto {
  id: string;
  email: string;
  firstname: string;
  lastname?: string;
  role: UserRole;
  isLoggedIn: boolean;
}

export interface DraftDto extends CreateIdeaDto {
  _id: string;
  createdAt: Date;
}

export interface CreateDraftDto extends UpdateDraftDto {
  userId: string;
}

export interface UpdateDraftDto {
  title: string;
  description: string;
}
