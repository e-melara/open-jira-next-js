interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  status: String;
  createdAt: number;
  description: String;
}

export const seedData: SeedData = {
  entries: [
    {
      status: 'pending',
      createdAt: Date.now(),
      description:
        'Pendientes: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has',
    },
    {
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
      description:
        'Progress: It is a long established fact that a reader will be distracted by the readable content of a page',
    },
    {
      status: 'finished',
      createdAt: Date.now() - 1000,
      description:
        'Finished: Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical',
    },
  ],
};
