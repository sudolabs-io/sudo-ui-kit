import { Meta, StoryFn } from '@storybook/react'
import { Image, ImageGallery, ImageGalleryProps } from './image-gallery'

const IMAGE_URL = 'https://picsum.photos/id/36/200/300'

const TitleImage: Image = { src: IMAGE_URL, alt: 'Image' }
const Images: Image[] = Array(6)
  .fill(null)
  .map(() => ({ src: IMAGE_URL, alt: 'Ordinary image' }))

const Template: StoryFn<typeof ImageGallery> = (args: ImageGalleryProps) => (
  <ImageGallery {...args} />
)

export const Default = Template.bind({})
Default.args = {
  titleImage: TitleImage,
  images: Images,
}

export default {
  title: 'Components/ImageGallery/ImageGallery',
  component: ImageGallery,
} as Meta
