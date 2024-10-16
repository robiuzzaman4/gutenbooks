/* eslint-disable @typescript-eslint/no-explicit-any */
const BookCard = ({ book }: any) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow hover:shadow-2xl flex flex-col gap-4">
      <img
        src={book?.formats["image/jpeg"]}
        alt="book cover"
        className="h-40 w-full object-cover rounded-md"
      />
      <div className="grid gap-1">
        <h3 className="text-base font-medium tracking-tighter truncate text-zinc-700">
          {book?.title}
        </h3>
        <span className="flex items-center gap-1">
          <h3 className="text-sm font-medium tracking-tighter shrink-0 text-zinc-700">
            Id:
          </h3>
          <h3 className="text-sm font-medium tracking-tighter line-clamp-1 text-zinc-500">
            {book?.id ? book?.id : "N/A"}
          </h3>
        </span>
        <span className="flex items-center gap-1">
          <h3 className="text-sm font-medium tracking-tighter shrink-0 text-zinc-700">
            Author:
          </h3>
          <h3 className="text-sm font-medium tracking-tighter line-clamp-1 text-zinc-500">
            {book?.authors[0]?.name ? book?.authors[0]?.name : "N/A"}
          </h3>
        </span>
        <span className="flex flex-col gap-1">
          <h3 className="text-sm font-medium tracking-tighter shrink-0 text-zinc-700">
            Genre:
          </h3>
          <ul className="list-disc">
            {book?.subjects?.map((item: string, index: number) => (
              <li
                key={index}
                className="text-sm font-medium tracking-tighter line-clamp-1 text-zinc-500"
              >
                {item}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default BookCard;
