import { Meta, StoryObj } from '@storybook/react'
import { VideoPlayer, VideoPlayerProps } from './video-player'

const VIDEO_SRC =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
const THUMBNAIL_SRC = 'https://picsum.photos/id/237/200/300'

type VideoPlayerStoryProps = Pick<VideoPlayerProps, 'src' | 'thumbnail'>

const VideoPlayerStory = ({ src, thumbnail }: VideoPlayerStoryProps) => (
  <VideoPlayer src={src} thumbnail={thumbnail} />
)

type Story = StoryObj<typeof VideoPlayerStory>

export const Default: Story = {
  render: (args) => <VideoPlayerStory {...args} />,
  args: {
    src: VIDEO_SRC,
    thumbnail: THUMBNAIL_SRC,
  },
}

const meta: Meta<typeof VideoPlayerStory> = {
  title: 'Components/VideoPlayer/VideoPlayer',
  component: VideoPlayerStory,
  argTypes: {
    src: {
      type: 'string',
      defaultValue: VIDEO_SRC,
    },
    thumbnail: { type: 'string', defaultValue: THUMBNAIL_SRC },
  },
}

export default meta
