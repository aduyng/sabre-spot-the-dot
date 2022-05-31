export default ({ url }) => {
  const save = document.createElement("a");
  save.target = "_blank";
  save.href = url;
  save.click();
};
