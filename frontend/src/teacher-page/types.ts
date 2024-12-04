export type BootCampPostData = {
  name: string;
  clerkId: string;
};

export type BootCampGetData = {
  name: string;
  id: string;
  teacher: string;
};

export type TeacherBootCampList = {
  bootcamps: BootCampGetData[];
};

export type Topic = {
  id: 0;
  label: "string";
  value: 0;
};

export type TopicList = {
  topics: Topic[];
};

export type TopicPostData = {
  name: string;
  id: number;
};

export type Card = {
  question: string;
  answer: string;
  id: number;
};

export type Student = {
  clerkId: string;
  name: string;
  bootCampId: number;
  bootcamp: string;
};
