exports.seed = async knex => {
  await knex("Launch").del();
  await knex("Screenshot").del();
  await knex("Job").del();
  await knex("UserProjectRole").del();

  await knex("UserProjectRole").insert([
    { id: 1, userId: 1, projectId: 1, roleId: 1 },
    { id: 2, userId: 1, projectId: 2, roleId: 2 },
    { id: 3, userId: 1, projectId: 3, roleId: 3 }
  ]);

  await knex("Job").insert([
    { id: 1, projectId: 1, name: "Job 1" },
    { id: 2, projectId: 1, name: "Job 2" },
    { id: 3, projectId: 2, name: "Job 3" },
    { id: 4, projectId: 2, name: "Job 4" },
    { id: 5, projectId: 3, name: "Job 5" },
    { id: 6, projectId: 3, name: "Job 6" }
  ]);

  await knex("Launch").insert([
    {
      id: 1,
      jobId: 1,
      status: "COMPLETE",
      isGolden: true,
      startedAt: 1654126039,
      completedAt: 1654126439
    },
    {
      id: 2,
      jobId: 1,
      status: "PROCESSING",
      isGolden: false,
      startedAt: 1654426039,
      completedAt: 1654999439
    }
  ]);

  await knex("Screenshot").insert([
    {
      id: 1,
      launchId: 1,
      createdAt: 23123123111,
      name: "cool screenshot",
      url: "https://picsum.photos/530/354",
      diffUrl: "https://picsum.photos/531/354",
      size: 300,
      diffPercentage: 85,
      status: "COMPLETE"
    },
    {
      id: 2,
      launchId: 2,
      createdAt: 231231231111,
      name: "cool screenshot",
      url: "https://picsum.photos/532/354",
      diffUrl: "https://picsum.photos/533/354",
      size: 300,
      diffPercentage: 90,
      status: "COMPLETE"
    },
    {
      id: 3,
      launchId: 2,
      createdAt: 231231231111,
      name: "another cool screenshot",
      url: "https://picsum.photos/534/354",
      diffUrl: "https://picsum.photos/535/354",
      size: 300,
      diffPercentage: 95,
      status: "COMPLETE"
    },
    {
      id: 4,
      launchId: 1,
      createdAt: 231231231111,
      name: "another cool screenshot",
      url: "https://picsum.photos/536/354",
      diffUrl: "https://picsum.photos/537/354",
      size: 300,
      diffPercentage: 96,
      status: "COMPLETE"
    },
    {
      id: 5,
      launchId: 2,
      createdAt: 231231231111,
      name: "another cool screenshot2",
      url: "https://picsum.photos/538/354",
      diffUrl: "https://picsum.photos/539/354",
      size: 300,
      diffPercentage: 97,
      status: "COMPLETE"
    },
  ]);
};
