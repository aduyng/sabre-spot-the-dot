const { LAUNCH_STATUS_IN_PROGRESS } = require("../../../consts");

module.exports = async ({
  trx,
  job,
  buildUrl,
  buildNumber,
  buildName,
  commit,
  branch,
  creator
}) => {
  const launch = await trx("Launch")
    .where({ jobId: job.id, name: buildName })
    .first();
  if (launch) {
    await trx("Launch")
      .where({ id: launch.id })
      .update({
        status: LAUNCH_STATUS_IN_PROGRESS,
        updatedAt: Date.now(),
        updatedByUserId: creator.id
      });
    return launch;
  }

  const hasGoldenLaunch = await trx("Launch")
    .select("id")
    .where({
      isGolden: true
    })
    .first();

  const [createdLaunch] = await trx("Launch")
    .insert({
      name: buildName,
      url: buildUrl,
      jobId: job.id,
      isGolden: !hasGoldenLaunch,
      status: LAUNCH_STATUS_IN_PROGRESS,
      createdAt: Date.now(),
      createdByUserId: creator.id,
      number: buildNumber,
      commit,
      branch
    })
    .returning("*");

  return createdLaunch;
};
