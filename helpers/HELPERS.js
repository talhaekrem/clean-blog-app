const formatDate = (date) => {
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.toLocaleString("tr-TR", { month: "long" });
  return `${month} ${day}, ${year}`;
};

module.exports = { formatDate };
