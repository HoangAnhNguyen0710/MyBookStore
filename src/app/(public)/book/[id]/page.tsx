"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Chip,
  Rating,
  Button,
  TextField,
  Tab,
} from "@mui/material";
import {
  BookFilterDto,
  BookFilterResponseDto,
  BookListItem,
  GetBookResponseDto,
} from "@/api";
import { AxiosError } from "axios";
import { getBook } from "@/services/getBook";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { listingBooks } from "@/services/filterBooks";
import BookCard from "@/components/Home/BookCard";

const BookDetailPage: React.FC = () => {
  const params = useParams();
  const [book, setBook] = useState<GetBookResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>();
  const [item_value, setItemValue] = useState(0);
  const [tab_index, setTabIndex] = useState(0);
  const [related_books, setRelatedBooks] = useState<
    BookListItem[] | undefined
  >();
  const id = params?.id;
  useEffect(() => {
    async function getBookDetail(id: string) {
      setLoading(true);
      try {
        const book = await getBook(id);
        const book_with_type = book as unknown as GetBookResponseDto;
        setBook(book_with_type);
        const filter_related_book: BookFilterDto = { page: 1, per_page: 8 };
        // if (book_with_type.publisher) {
        //   filter_related_book.publisher_ids = [book_with_type.publisher.id];
        // }
        if (book_with_type.category) {
          filter_related_book.category_ids = [book_with_type.category.id];
        }
        const filter_list = await listingBooks(filter_related_book);
        const related_list = (filter_list as unknown as BookFilterResponseDto)
          .list;
        setRelatedBooks(
          related_list?.filter((book) => book.id !== book_with_type.id)
        );
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          console.log(error?.response?.data?.message);
        }
      }
      setLoading(false);
    }
    if (id) {
      getBookDetail(String(id));
    }
  }, [id]);

  const handleIncreaseItem = () => {
    setItemValue((prev) => Math.min(prev + 1, 200)); // Giới hạn max = 200
  };

  const handleDecreaseItem = () => {
    setItemValue((prev) => Math.max(prev - 1, 0)); // Giới hạn min = 0
  };

  const handleChangeItemValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      setItemValue(Math.max(0, Math.min(newValue, 200))); // Giới hạn từ 0 - 200
    }
  };

  const handleChangeTabIndex = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTabIndex(newValue);
  };
  // const [tabIndex, setTabIndex] = useState<number>(0);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setTabIndex(newValue);
  // };
  if (loading) return <div>Book detail loading skeleton here</div>;

  return book ? (
    <Container className="my-4">
      {/* Layout 2 cột */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 border-2 rounded-md px-4 py-8">
        {/* Ảnh bìa sách */}
        <Box className="md:col-span-1 flex justify-center">
          {book.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover_image_url}
              alt={book.title}
              className="rounded-lg shadow-lg w-full max-w-md h-fit object-cover p-2 border"
            />
          ) : (
            <div className="w-full max-w-xs h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </Box>

        {/* Thông tin sách */}
        <Box className="md:col-span-2 space-y-4">
          <Typography className="font-bold !text-6xl text-slate-800">
            {book.title}
          </Typography>
          <Typography variant="h6" className="text-gray-700">
            by <b>{book.author}</b>
          </Typography>

          <Typography className="text-red-500 !text-3xl">
            ${book.price ? book.price.toFixed(2) : "N/A"}
          </Typography>

          <Typography className="text-gray-700 flex items-center">
            <Rating size="medium" value={book.rating} className="pr-2" />(
            {book.number_of_reviews} reviews)
          </Typography>
          <Divider />
          <Box component="div" className="flex flex-col">
            <div className="flex items-center gap-2">
              <Button
                variant="outlined"
                className="font-semibold !text-xl p-0"
                onClick={handleDecreaseItem}
                disabled={item_value <= 0}
              >
                <RemoveIcon />
              </Button>

              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={item_value}
                onChange={handleChangeItemValue}
                slotProps={{
                  input: {
                    inputProps: {
                      min: 0,
                      max: book.stock_quantity,
                    },
                  },
                }}
                className="w-[80px] text-center"
              />

              <Button
                variant="outlined"
                className="font-semibold !text-xl p-0"
                onClick={handleIncreaseItem}
                disabled={item_value >= 200}
              >
                <AddIcon />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button
                variant="contained"
                className="!bg-primary hover:!bg-slate-800 !p-4 !rounded-3xl !font-semibold"
              >
                Order Now
              </Button>
              <Button
                variant="contained"
                className="!bg-slate-800 hover:!bg-primary !p-4 !rounded-3xl !font-semibold"
              >
                Add To Cart
              </Button>
              <Button
                variant="contained"
                className="!bg-slate-800 hover:!bg-primary !p-4 !rounded-3xl !font-semibold"
              >
                <FavoriteBorderIcon />
              </Button>
            </div>
          </Box>

          <Divider />

          {/* <Divider /> */}

          <Typography className="text-gray-700 !text-lg">
            <strong>Publisher:</strong>{" "}
            {book.publisher ? book.publisher.name : "Unknown"}
          </Typography>
          <Typography className="text-gray-700 !text-lg">
            <strong>Category:</strong>{" "}
            {book.category ? book.category.name : "Unknown"}
          </Typography>

          {/* <Divider /> */}
          <Typography className="text-gray-700 !text-lg">
            <strong>Pages:</strong> {book.page_count}
          </Typography>
          <Typography className="text-gray-700 !text-lg">
            <strong>Weight:</strong> {book.weight}
          </Typography>
          {book.dimensions && (
            <Typography className="text-gray-700 !text-lg">
              <strong>Dimensions:</strong> {book.dimensions.width} x{" "}
              {book.dimensions.height} x {book.dimensions.thickness}
            </Typography>
          )}

          {/* Danh sách tags */}
          {book.tags && book.tags.length > 0 && (
            <Box className="mt-2 flex items-center">
              <Typography className="text-gray-700 !text-lg">
                <strong>Tags:</strong>
              </Typography>
              <Box className="flex flex-wrap gap-2 mx-2">
                {book.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    color="error"
                    variant="outlined"
                    size="medium"
                    className="!text-lg !px-2"
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
        <Box
          component="div"
          className="col-span-1 md:col-span-3 mt-8 w-full "
        >
          <TabContext value={tab_index}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChangeTabIndex}
                aria-label="lab API tabs example"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#ff5722",
                    height: 3, // Tăng độ dày của underline (tuỳ chọn)
                    overflowX: "scroll"
                  },
                }}
              >
                <Tab
                  label="Description"
                  className="!text-sm md:!text-lg !text-primary"
                  value={0}
                />
                <Tab
                  label="More Infor"
                  className="!text-sm md:!text-lg !text-primary"
                  value={1}
                />
                <Tab
                  label="Reviews"
                  className="!text-sm md:!text-lg !text-primary"
                  value={2}
                />
              </TabList>
            </Box>
            <TabPanel value={0} className="!min-h-40">
              <Typography
                variant="body1"
                className="text-gray-700 leading-relaxed !text-lg"
              >
                {book.description}
              </Typography>
            </TabPanel>
            <TabPanel value={1} className="!min-h-40">
              <Box>
                <Typography className="text-gray-600 !text-lg">
                  <strong>ISBN:</strong> {book.isbn}
                </Typography>
                <Typography className="text-gray-600 !text-lg">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Typography className="text-gray-600 !text-lg">
                  <strong>Edition:</strong> {book.edition}
                </Typography>
                <Typography className="text-gray-600 !text-lg">
                  <strong>Series:</strong> {book.series}
                </Typography>
              </Box>
            </TabPanel>
            <TabPanel value={2} className="!min-h-40">
              <Typography className="text-gray-600 !text-lg">
                List of reviews here (coming soon)
              </Typography>
            </TabPanel>
          </TabContext>
        </Box>
        <Box
          component="div"
          className="col-span-1 md:col-span-3 mt-8 w-full px-4"
        >
          <Typography className="!text-2xl !text-primary !uppercase !mb-4 !font-bold">
            Related Items
          </Typography>
          {/* <Typography className="!text-base !text-slate-800">Coming soon ...</Typography> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full pb-8">
            {related_books &&
              related_books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
          </div>
        </Box>
      </Box>

      {/* Mô tả sách */}
    </Container>
  ) : (
    <Box className="text-center mt-10 text-gray-500">
      <Box
        component="div"
        className="min-h-64 flex items-center justify-center"
      >
        <Typography variant="h1">Book Not Found</Typography>
      </Box>
    </Box>
  );
};

export default BookDetailPage;
