import { Image } from "@nextui-org/react";

type Props = {
  width: number;
  height: number;
  src: string;
};

const ImageContainer = ({ width, height, src }: Props) => {
  const widthHeightRatio = height / width;
  const galleryHeight = Math.ceil(250 * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;
  return (
    <>
      <div
        className="w-[250px] justify-self-center"
        style={{ gridRow: `span ${photoSpans}` }}
      >
        <div className="rounded-xl overflow-hidden group">
          <Image
            src={`${import.meta.env.VITE_IMAGE_API}${src}`}
            width={width}
            height={height}
            sizes="250px"
            placeholder="blur"
            className="group-hover:opacity-75"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default ImageContainer;
