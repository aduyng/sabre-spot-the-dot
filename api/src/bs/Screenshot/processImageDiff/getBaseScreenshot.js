module.exports = ({ knex, screenshot }) => {
  return knex("Screenshot")
    .where({ name: screenshot.name })
    .where("launchId", function whereLaunchId() {
      return this.select("id")
        .from("Launch")
        .where({
          isGolden: true
        })
        .where("jobId", function whereJobId() {
          return this.select("jobId")
            .from("Launch")
            .innerJoin("Screenshot", "Launch.id", "Screenshot.launchId")
            .where("Screenshot.id", screenshot.id);
        });
    })
    .first();
};
