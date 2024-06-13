/** */
export const getFormattedDate = (
  date: string | number | Date | undefined,
): string =>
  date
    ? new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

type CategorizedPDFs = Record<
  number,
  Record<string, { path: string; name: string }[]>
>;

export const fetchPDFs = (
  pdfPaths: Record<string, () => Promise<unknown>>,
): CategorizedPDFs => {
  const categorized: CategorizedPDFs = {};

  Object.keys(pdfPaths).forEach((pdfPath) => {
    const fileName = pdfPath.split("/").pop();

    if (!fileName) {
      console.error(`Unable to extract file name from ${pdfPath}`);
      return;
    }

    // Extract metadata from file name
    const metaData = fileName.split("-");

    if (metaData.length !== 3) {
      console.error(`Invalid file name format ${fileName}`);
      return;
    }

    const level: number = parseInt(metaData[0].charAt(metaData[0].length - 4));
    const courseCode: string = metaData[0];
    const season: string = metaData[1].toLowerCase();
    const year: number = parseInt(metaData[2]);

    // Check if all metadata is present
    if (!level || !courseCode || !season || !year) {
      console.error(`Unable to extract course metadata from ${fileName}`);

      // print out all the metadata
      console.log("level:", level);
      console.log("courseCode:", courseCode);
      console.log("season:", season);
      console.log("year:", year);

      return;
    }

    // Check if level is valid
    if (isNaN(level) || level < 1 || level > 5) {
      console.error(`Invalid course level ${level} in ${fileName}`);
      return;
    }

    // Check if term is valid
    if (!["fall", "winter", "spring", "summer"].includes(season)) {
      console.error(`Invalid season ${season} in ${fileName}`);
      return;
    }

    // Check if year is valid
    if (isNaN(year) || year < 1000 || year > 9999) {
      console.error(`Invalid year ${year} in ${fileName}`);
      return;
    }

    if (!categorized[level]) {
      categorized[level] = {};
    }

    if (!categorized[level][season]) {
      categorized[level][season] = [];
    }

    categorized[level][season].push({
      path: pdfPath.replace("/public", ""),
      name: fileName,
    });
  });

  // print a list of all the categorized PDFs by filename, separated by \n
  console.log("Categorized PDFs:");
  console.log(JSON.stringify(categorized, null, 2));

  return categorized;
};
