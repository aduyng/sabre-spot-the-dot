const { connectDb } = require("../../knex/knex");

module.exports = async ({ userId, launchId }) => {
  const knex = await connectDb();
  // const res = knex.raw(
  //   `
  // select base.*, golden.url as "goldenUrl" from "Screenshot" base
  // inner join "Screenshot" golden on base.name = golden.name
  // inner join "Launch" blaunch on base."launchId" = blaunch.id
  // inner join "Job" job on blaunch."jobId" = job.id
  // inner join "Launch" glaunch on golden."launchId" = glaunch.id
  // inner join "Project" project on job."projectId" = project.id
  // inner join "UserProjectRole" upr on project.id = upr."projectId"
  // where job.id = glaunch."jobId" and blaunch.id = ? and blaunch.id != glaunch.id and upr."userId" = ?
  // `,
  //   [launchId, userId]
  // );
  // console.log("screenshots", res)
  // return res
  return knex(knex.ref("Screenshot").as("base"))
    .select(["base.*", "golden.url as goldenUrl"])
    .innerJoin(knex.ref("Screenshot").as("golden"), "base.name", "golden.name")
    .innerJoin(knex.ref("Launch").as("blaunch"), "base.launchId", "blaunch.id")
    .innerJoin(knex.ref("Job").as("job"), "blaunch.jobId", "job.id")
    .innerJoin(knex.ref("Launch").as("glaunch"), "golden.launchId", "glaunch.id")
    .innerJoin(knex.ref("Project").as("project"), "job.projectId", "project.id")
    .innerJoin(knex.ref("UserProjectRole").as("upr"), "project.id", "upr.projectId")
    .where({
      "job.id": knex.ref("glaunch.jobId"),
      "blaunch.id": launchId,
      "upr.userId": userId,
      "glaunch.isGolden": true
    })
    .whereNot({ "blaunch.id": knex.ref("glaunch.id") });
};
