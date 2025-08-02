export async function fetchMerchData() {
  const res = await fetch(
    // "https://docs.google.com/spreadsheets/d/your-sheet-id/gviz/tq?tqx=out:csv",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQiwePOTZKA4Afa4q5smmAQL2UKPSeCvYVImhMbW_LpdRZOYLM4FImRyvfxu6tnbLMSZziBunGxuGgV/pub?gid=0&single=true&output=csv",
  );
  const text = await res.text();
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const item = {
      id: values[0],
      name: values[1],
      image: values[2],
      sizes: {},
    };
    headers.slice(3).forEach((size, index) => {
      const qty = parseInt(values[index + 3]);
      if (!isNaN(qty)) item.sizes[size] = qty;
    });
    return item;
  });
}

