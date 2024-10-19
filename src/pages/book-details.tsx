import { useLoaderData } from "react-router-dom";

const BookDetailsPage = () => {
  const book = useLoaderData();
  console.log("book details", book);

  return <div></div>;
};

export default BookDetailsPage;
