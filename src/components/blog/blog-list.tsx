import { Input, Select, SelectItem } from "@nextui-org/react";
import BlogListItem from "./blog-list-item";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";

type BlogListItemProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publishedBlogEntries: any[];
};

export default function BlogList({
  publishedBlogEntries,
}: Readonly<BlogListItemProps>) {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [filteredEntries, setFilteredEntries] = useState(publishedBlogEntries);

  const categories = Array.from(
    new Set(
      publishedBlogEntries.map((blogPostEntry) => blogPostEntry.data.category),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const fuseOptions = {
    // Search by title, author, category, and tags
    keys: ["data.title", "data.author", "data.category", "data.tags"],
    isCaseSensitive: false,
    threshold: 0.5,
  };

  const fuse = new Fuse(publishedBlogEntries, fuseOptions);

  useEffect(() => {
    let results = publishedBlogEntries;

    // Use Fuse.js to fuzzy search the blog post entries
    if (searchFilter) {
      results = fuse.search(searchFilter).map(({ item }) => item);
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter(
        (blogPostEntry) => blogPostEntry.data.category === selectedCategory,
      );
    }

    setFilteredEntries(results);
  }, [selectedCategory, searchFilter, publishedBlogEntries]);

  return (
    <div className="flex flex-col items-center w-full gap-y-12">
      <div className="flex flex-col items-center md:grid md:grid-cols-4 gap-4 w-full max-w-screen-sm">
        <Input
          placeholder="Search for a post"
          size="lg"
          radius="sm"
          value={searchFilter}
          onValueChange={(value) => {
            setSearchFilter(value);
          }}
          className="col-span-3"
        />
        <Select
          label="Category"
          size="sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-1/2 md:w-full">
          {/* Width is set to 1/2 on mobile due to dropdown bug */}
          {categories.map((category) => (
            <SelectItem
              key={category}
              value={category === "Any" ? undefined : category}
              className="text-white">
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>
      <ul className="grid gap-16 max-w-4xl mx-auto">
        {filteredEntries.map((blogPostEntry, index) => (
          <BlogListItem
            slug={blogPostEntry.slug}
            image={blogPostEntry.data.image}
            category={blogPostEntry.data.category}
            title={blogPostEntry.data.title}
            author={blogPostEntry.data.author}
            publishDate={blogPostEntry.data.publishDate}
            index={index}
            key={blogPostEntry.slug}
          />
        ))}
      </ul>
    </div>
  );
}
