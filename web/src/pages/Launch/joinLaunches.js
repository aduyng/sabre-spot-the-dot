//
// Matches the two arrays of launches by name, and keeps the ones that are missing a partner
//
// Possible states:
// 1. Has base, diff, and golden
// 2. Has base, golden => diff is in the works
// 3. Has base => new test or no golden entry with same name
// 4. Has golden => old test or base has no entry with the same name

export default ({ base, golden }) => {
  const nameToLaunch = base.reduce((acc, l) => {
    // without doing this we will create a new object every iteration
    // eslint-disable-next-line no-param-reassign
    acc[l.name] = l;
    return acc;
  }, {});
  // now all of the base names link to the object with the url and maybe the diffurl
  golden.forEach(l => {
    if (l.name in nameToLaunch) {
      // if the name from the golden set is in there, then set the goldenurl on that entry
      nameToLaunch[l.name].golden = l.name;
      nameToLaunch[l.name].goldenId = l.id;
      nameToLaunch[l.name].goldenLaunchId = l.launchId;
    } else {
      // else, put the golden with no diff url so we know that it is only a golden
      nameToLaunch[l.name] = { ...l, diff: undefined };
    }
  });
  if (!nameToLaunch) {
    return [];
  }
  return Object.values(nameToLaunch);
};
