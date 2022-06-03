const { JOB_STATUS_CREATED, JOB_STATUS_IN_PROGRESS } = require("../../../consts");

module.exports = async ({ projectId, trx, jobName, jobUrl, creator }) => {
  const job = await trx("Job")
    .where({ projectId, name: jobName })
    .first();
  if (job) {
    await trx("Job")
      .where({ id: job.id })
      .update({
        status: JOB_STATUS_IN_PROGRESS,
        updatedAt: Date.now(),
        updatedByUserId: creator.id
      });

    return job;
  }

  const [createdJob] = await trx("Job")
    .insert({
      projectId,
      name: jobName,
      url: jobUrl,
      status: JOB_STATUS_CREATED,
      createdAt: Date.now(),
      createdByUserId: creator.id
    })
    .returning("*");

  return createdJob;
};
