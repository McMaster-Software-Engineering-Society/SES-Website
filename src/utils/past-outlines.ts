type pdfMetadata = {
  courseCode: string;
  term: string;
  level: number;
  pdfPath: string;
};

export type Course = pdfMetadata & {
  pngPaths: string[];
};

const fetchOutlinePDFs = (pdfPaths: string[]): pdfMetadata[] => {
  const categorized: pdfMetadata[] = [];

  pdfPaths.forEach((pdfPath) => {
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
    const courseCode: string = metaData[0].replace("_", " ");
    const season: string = metaData[1].toLowerCase();
    const year: number = parseInt(metaData[2]);

    // Check if all metadata is present
    if (!level || !courseCode || !season || !year) {
      console.error(`Unable to extract course metadata from ${fileName}`);

      // print out all the metadata
      console.error("level:", level);
      console.error("courseCode:", courseCode);
      console.error("season:", season);
      console.error("year:", year);

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

    categorized.push({
      courseCode: courseCode,
      term: `${season.charAt(0).toUpperCase() + season.slice(1)} ${year}`,
      level: level,
      pdfPath: pdfPath.replace("/public", ""),
    } as pdfMetadata);
  });

  return categorized;
};

const fetchOutlinesWithPngs = (
  pngFilePaths: string[],
  filteredPDFs: pdfMetadata[],
): Course[] => {
  // Extract all the filenames from the categorized PDFs
  const courseFileNames: string[] = [];

  filteredPDFs.forEach((course) => {
    const pdfFile = course.pdfPath.split("/").pop()?.replace(".pdf", "");
    if (pdfFile) courseFileNames.push(pdfFile);
  });

  const coursesWithPdfAndPngs = filteredPDFs.map((course) => {
    return {
      ...course,
      pngPaths: [] as string[],
    };
  });

  // Filter out PNGs that don't have a corresponding PDF
  pngFilePaths.forEach((filePath) => {
    const pngName = filePath.split("/").pop()?.replace(".png", "");
    const fileName = pngName?.split("-").slice(0, -1).join("-");

    // Check if the PNG has a corresponding PDF
    const pdfExists = fileName && courseFileNames.includes(fileName);

    // Check if the filename has a correctly formatted page number
    const hasPageNumber = /^[1-9]\d*$/.test(pngName?.split("-").pop() ?? "");

    if (!pdfExists || !hasPageNumber) {
      console.error(`Invalid PNG file ${pngName}`);
    } else {
      const course = coursesWithPdfAndPngs.find((course) => {
        const courseNameWithTerm = course.pdfPath
          .split("/")
          .pop()
          ?.replace(".pdf", "");

        return courseNameWithTerm === fileName;
      });

      if (course) {
        course["pngPaths"].push(filePath.replace("/public", ""));
      }
    }
  });

  return coursesWithPdfAndPngs;
};

// TODO: Add return type
export const fetchOutlines = (): Course[] => {
  // Import all PDFs in the past-outlines directory
  const pdfs = Object.keys(
    import.meta.glob("../../public/past-outlines/*.pdf"),
  );
  // Import all PNGs in the past-outlines directory
  const pngs = Object.keys(
    import.meta.glob("../../public/past-outlines/*.png"),
  );

  // Categorize PDFs by level and season
  const filteredPDFs = fetchOutlinePDFs(pdfs);

  // Match PDFs with corresponding PNGs
  return fetchOutlinesWithPngs(pngs, filteredPDFs);
};
