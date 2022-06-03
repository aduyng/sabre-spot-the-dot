const {
  LAUNCH_STATUS_COMPLETE,
  LAUNCH_STATUS_IN_PROGRESS,
  SCREENSHOT_STATUS_COMPLETE
} = require("../../consts");

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
    {
      id: 1,
      projectId: 1,
      name: "Job 1",
      url: "google.com",
      createdAt: 12313223423,
      createdByUserId: 1,
      updatedAt: 232342342343,
      updatedByUserId: 1
    },
    {
      id: 2,
      projectId: 1,
      name: "Job 2",
      url: "google.com",
      createdAt: 12313223423,
      createdByUserId: 1,
      updatedAt: 232342342343,
      updatedByUserId: 1
    },
    {
      id: 3,
      projectId: 2,
      name: "Job 3",
      url: "google.com",
      createdAt: 12313223423,
      createdByUserId: 1,
      updatedAt: 232342342343,
      updatedByUserId: 1
    },
    {
      id: 4,
      projectId: 2,
      name: "Job 4",
      url: "google.com",
      createdAt: 12313223423,
      createdByUserId: 1,
      updatedAt: 232342342343,
      updatedByUserId: 1
    },
    {
      id: 5,
      projectId: 3,
      name: "Job 5",
      url: "google.com",
      createdAt: 12313223423,
      createdByUserId: 1,
      updatedAt: 232342342343,
      updatedByUserId: 1
    },
    {
      id: 6,
      projectId: 3,
      name: "Job 6",
      url: "google.com",
      createdAt: 12313223423,
      createdByUserId: 1,
      updatedAt: 232342342343,
      updatedByUserId: 1
    }
  ]);

  await knex("Launch").insert([
    {
      id: 1,
      name: "Launch 1",
      url: "google.com",
      number: 1,
      commit: "commit name",
      branch: "branch name",
      jobId: 1,
      status: LAUNCH_STATUS_COMPLETE,
      isGolden: true,
      createdAt: 1654126039,
      updatedAt: 1654126439,
      createdByUserId: 1,
      updatedByUserId: 1
    },
    {
      id: 2,
      name: "Launch 2",
      url: "google.com",
      number: 2,
      commit: "commit name 2",
      branch: "branch name 2",
      jobId: 1,
      status: LAUNCH_STATUS_IN_PROGRESS,
      isGolden: false,
      createdAt: 1654126039,
      updatedAt: 1654126439,
      createdByUserId: 1,
      updatedByUserId: 1
    }
  ]);

  await knex("Screenshot").insert([
    {
      id: 1,
      launchId: 1,
      name: "cool screenshot",
      url: "https://picsum.photos/530/354",
      diffUrl: "https://picsum.photos/531/354",
      size: 300,
      diffPercentage: 85,
      status: SCREENSHOT_STATUS_COMPLETE,
      createdAt: 123123123123,
      createdByUserId: 1,
      updatedAt: 234234234234,
      updatedByUserId: 1
    },
    {
      id: 2,
      launchId: 2,
      name: "cool screenshot",
      url: "https://picsum.photos/532/354",
      diffUrl: "https://picsum.photos/533/354",
      size: 300,
      diffPercentage: 90,
      status: SCREENSHOT_STATUS_COMPLETE,
      createdAt: 123123123123,
      createdByUserId: 1,
      updatedAt: 234234234234,
      updatedByUserId: 1
    },
    {
      id: 3,
      launchId: 2,
      name: "another cool screenshot",
      url: "https://picsum.photos/534/354",
      diffUrl: "https://picsum.photos/535/354",
      size: 300,
      diffPercentage: 95,
      status: SCREENSHOT_STATUS_COMPLETE,
      createdAt: 123123123123,
      createdByUserId: 1,
      updatedAt: 234234234234,
      updatedByUserId: 1
    },
    {
      id: 4,
      launchId: 1,
      name: "another cool screenshot",
      url: "https://picsum.photos/536/354",
      diffUrl: "https://picsum.photos/537/354",
      size: 300,
      diffPercentage: 96,
      status: SCREENSHOT_STATUS_COMPLETE,
      createdAt: 123123123123,
      createdByUserId: 1,
      updatedAt: 234234234234,
      updatedByUserId: 1
    },
    {
      id: 5,
      launchId: 2,
      name: "another cool screenshot2",
      url: "https://picsum.photos/538/354",
      diffUrl: "https://picsum.photos/539/354",
      size: 300,
      diffPercentage: 97,
      status: SCREENSHOT_STATUS_COMPLETE,
      createdAt: 123123123123,
      createdByUserId: 1,
      updatedAt: 234234234234,
      updatedByUserId: 1
    }
  ]);
};
