/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import { cn } from 'lib/utils'
import LazyImage from 'next/legacy/image'
import Lightbox from 'yet-another-react-lightbox'
import { AspectRatioBox } from './aspect-ratio-box'
import { COLLAGE_HEIGHT, MAX_VISIBLE_PHOTOS_COUNT, SMALL_CELL } from './constants'
import { SlideOverlay } from './slide-overlay'
import 'yet-another-react-lightbox/styles.css'

const NUMBER_OF_SMALL_IMAGES_IN_COLLAGE = 3

export type Image = {
  src: string
  alt: string
}

export interface ImageGalleryProps {
  titleImage?: Image
  images: Image[]
  className?: string
}

export const ImageGallery = ({ titleImage, images, className }: ImageGalleryProps) => {
  const [slideIndex, setSlideIndex] = useState<number | undefined>(undefined)

  const lightboxImages = [
    ...(titleImage ? [titleImage] : []),
    ...images.map(({ src }) => ({ src })),
  ]

  return (
    <>
      <div className={cn(`h-[${COLLAGE_HEIGHT}px]`, 'mb-6 grid grid-cols-4 gap-2.5', className)}>
        <AspectRatioBox
          ratio={1}
          className={cn(`h-[${COLLAGE_HEIGHT}px]`, 'col-span-2 row-span-2 w-full cursor-pointer')}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[12px] md:rounded-[20px]">
            {titleImage && (
              <LazyImage
                src={titleImage.src}
                objectFit="cover"
                onClick={() => {
                  setSlideIndex(0)
                }}
                placeholder="blur"
                blurDataURL={titleImage.src}
                alt={titleImage.alt}
                layout="fill"
              />
            )}
          </div>
        </AspectRatioBox>
        {images.slice(0, NUMBER_OF_SMALL_IMAGES_IN_COLLAGE).map(({ src, alt }, idx) => (
          <AspectRatioBox
            // eslint-disable-next-line react/no-array-index-key
            key={`${idx}-${src}`}
            ratio={1}
            className={cn(`h-[${SMALL_CELL}px]`, 'w-full cursor-pointer')}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[12px] md:rounded-[20px]">
              <LazyImage
                src={src}
                objectFit="cover"
                onClick={() => {
                  setSlideIndex(idx + 1)
                }}
                placeholder="blur"
                blurDataURL={src}
                alt={alt}
                layout="fill"
              />
            </div>
          </AspectRatioBox>
        ))}
        {images[3] && (
          <div
            className="relative col-span-1 row-span-1 flex cursor-pointer items-center justify-center overflow-hidden rounded-[12px] md:rounded-[20px]"
            onClick={() => {
              setSlideIndex(4)
            }}
          >
            <AspectRatioBox
              ratio={1}
              className={cn(`h-[${SMALL_CELL}px]`, 'w-full cursor-pointer')}
            >
              <div className="relative h-full w-full">
                <LazyImage
                  src={images[3].src}
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL={images[3].src}
                  alt={images[3].alt}
                  layout="fill"
                />
              </div>
            </AspectRatioBox>

            {lightboxImages.length > MAX_VISIBLE_PHOTOS_COUNT && (
              <SlideOverlay title={`More (+${lightboxImages.length - MAX_VISIBLE_PHOTOS_COUNT})`} />
            )}
          </div>
        )}
      </div>

      <Lightbox
        carousel={{ finite: true }}
        index={slideIndex}
        slides={lightboxImages}
        open={slideIndex !== undefined}
        close={() => setSlideIndex(undefined)}
        styles={{
          container: {
            background: 'var(--base-background, #09090B)',
          },
        }}
      />
    </>
  )
}
