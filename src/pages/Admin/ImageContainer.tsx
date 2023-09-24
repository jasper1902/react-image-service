import { Button, Image } from "@nextui-org/react";
import { useDeleteRequest } from "../../hook/useDeleteRequest";
import { useLocalStorage } from "@uidotdev/usehooks";
import type { ImagesFeed } from "../../models/Photo";

type Props = {
  width: number;
  height: number;
  src: string;
  filename: string;
  setImages: (i: ImagesFeed) => void;
  images: ImagesFeed;
  perPage: number;
  currentPage: number;
};

const ImageContainer = ({
  width,
  height,
  src,
  filename,
  images,
  setImages,
  perPage,
  currentPage,
}: Props) => {
  const [deleteData] = useDeleteRequest();
  const [token] = useLocalStorage("token");

  const onClickDeleteImage = () => {
    if (!images) return;

    deleteData(
      `${import.meta.env.VITE_IMAGE_API}/api/images/delete/${filename}`,
      token as string
    );

    const updatedPhotos = images?.photo.filter(
      (img) => img.filename !== filename
    );

    const totalPhotos = images?.totalPhotos - 1;
    const totalPages = Math.ceil(totalPhotos / perPage);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    setImages({
      photo: updatedPhotos,
      totalPhotos,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
    });
  };

  const widthHeightRatio = height / width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <>
      <div
        className="w-[250px] justify-self-center"
        style={{ gridRow: `span ${photoSpans}` }}
      >
        <div className="rounded-xl overflow-hidden group flex flex-col gap-1">
          <Image
            src={`${import.meta.env.VITE_IMAGE_API}${src}`}
            width={width}
            height={height}
            sizes="250px"
            placeholder="blur"
            className="group-hover:opacity-75"
            loading="lazy"
          />
          <Button
            color="danger"
            href="#"
            variant="flat"
            onClick={onClickDeleteImage}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
