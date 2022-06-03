const { connectDb } = require("../../knex/knex");

module.exports = async ({ projectId, jobId }) => {
  const knex = await connectDb();
  if (!jobId) {
    return knex("Project")
      .column({ projectName: "Project.name" })
      .where("Project.id", projectId)
      .first();
  }
  return knex("Project")
    .column({ projectName: "Project.name", jobName: "Job.name" })
    .where({ "Project.id": projectId, "Job.id": jobId });
};
