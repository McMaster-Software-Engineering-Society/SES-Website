import { defaultBlogPicture } from "data/blog";

type BlogListItemProps = {
  slug: string;
  image?: {
    src: string;
    alt: string;
  };
  category: string;
  title: string;
  author: string;
  publishDate: Date;
  index: number;
};

export default function BlogListItem({
  slug,
  image,
  category,
  title,
  author,
  index,
  publishDate,
}: Readonly<BlogListItemProps>) {
  return (
    <li>
      <a href={`/blog/${slug}`}>
        <div className="grid md:grid-cols-2 gap-5 md:gap-10 items-center">
          <img
            src={image?.src ?? defaultBlogPicture}
            alt={image?.alt ?? "Default image"}
            sizes="(max-width: 800px) 100vw, 800px"
            width={800}
            height={600}
            loading={index <= 2 ? "eager" : "lazy"}
            decoding={index <= 2 ? "sync" : "async"}
            className="w-full rounded-md object-cover object-center bg-white select-none pointer-events-none"
          />
          <div>
            <span className="text-primary uppercase tracking-wider text-sm font-medium">
              {category}
            </span>

            <h2 className="text-3xl font-semibold leading-snug tracking-tight mt-1">
              {title}
            </h2>

            <div className="flex gap-2 mt-3">
              <span className="text-gray-400">{author}</span>
              <span className="text-gray-400">• </span>
              <time
                className="text-gray-400"
                dateTime={publishDate.toISOString()}
              >
                {publishDate.toDateString()}
              </time>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}
