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
