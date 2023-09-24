import { useLocalStorage } from "@uidotdev/usehooks";

import ImageContainer from "./ImageContainer";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useFetchData } from "../../hook/useFetchData";
import { useVerify } from "../../hook/useVerify";
import { useLocation } from "react-router-dom";
import { ImagesFeedSchema, type ImagesFeed } from "../../models/Photo";

const FeedImages = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const routePage = queryParams.get("page");
  const perpage = queryParams.get("perpage");
  const [token] = useLocalStorage("token", undefined);
  const [page, setPage] = useState(Number(routePage) || 1);
  const [perPage] = useState(Number(perpage) || 30);

  useVerify();

  const [images, setImages] = useState<ImagesFeed>();

  const { data } = useFetchData<ImagesFeed>(
    `${
      import.meta.env.VITE_IMAGE_API
    }/api/images/?page=${page}&perPage=${perPage}`,
    token
  );

  useEffect(() => {
    if (data !== null) {
      setImages(ImagesFeedSchema.parse(data));
    }
  }, [data]);

  if (!images?.totalPages) return null;
  return (
    <>
      <div className="flex justify-center my-5 items-center gap-6">
        <Pagination
          total={images?.totalPages}
          initialPage={images?.currentPage}
          onChange={(e) => setPage(e)}
          loop
          showControls
        />
      </div>
      <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[13px]">
        {images?.photo.map((photo) => (
          <ImageContainer
            key={photo.id}
            width={photo.width}
            height={photo.height}
            src={photo.url}
            filename={photo.filename}
            images={images}
            setImages={setImages}
            currentPage={images?.currentPage}
            perPage={perPage}
          />
        ))}
      </section>
    </>
  );
};

export default FeedImages;
