export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  isPublished: boolean;
  updatedAt: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  bio: string;
  photoUrl: string;
  termStartDate: string;
  displayOrder: number;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
