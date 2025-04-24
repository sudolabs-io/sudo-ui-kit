import React, { MouseEvent } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { PlayIcon } from 'components/icons'

export type VideoPlayerProps = Omit<ReactPlayerProps, 'onPause'> & {
  src: string
  thumbnail?: string
  secondsToSeek?: number
  onPause?: (currentTime: number) => void
  onCaptureThumbnail?: (url: string) => void
}

export const VideoPlayer = ({
  src,
  thumbnail,
  secondsToSeek,
  onPause,
  onCaptureThumbnail,
  ...playerProps
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isSeeked, setIsSeeked] = React.useState(false)

  // Used for counting thumbnail on progress bar hover,
  // by putting same video into hidden video player -> seek
  // the time hovered on the progress bar -> take snapshot
  const hiddenPlayerRef = React.useRef<ReactPlayer | null>(null)
  const playerRef = React.useRef<ReactPlayer | null>(null)

  const [snapshot, setSnapshot] = React.useState<string | null>(null)
  const [hoverTime, setHoverTime] = React.useState<number | null>(null)

  const handlePause = () => {
    const player = playerRef.current?.getInternalPlayer()
    if (!player) {
      return
    }

    const seekTo = Math.round(player.currentTime as number)

    if (onPause) {
      onPause(seekTo)
    }

    setIsPlaying(false)
  }

  const captureSnapshot = (time: number) => {
    const player = hiddenPlayerRef.current?.getInternalPlayer()

    if (!player) {
      return
    }

    const canvas = document.createElement('canvas')

    player.currentTime = time
    player.onseeked = () => {
      const context = canvas.getContext('2d')
      canvas.width = player.videoWidth
      canvas.height = player.videoHeight
      // @ts-ignore
      context.drawImage(player, 0, 0, canvas.width, canvas.height)
      setSnapshot(canvas.toDataURL('image/png'))
    }
  }

  const handleProgressHover = (e: MouseEvent) => {
    const player = playerRef.current?.getInternalPlayer()

    if (!player) {
      return
    }
    // Small workaround: keep the native controls visible.
    if (isPlaying) {
      player.pause()
      player.play()
    }

    const progressBar = e.target
    if (progressBar instanceof HTMLElement) {
      const rect = progressBar.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const percentage = offsetX / rect.width
      const videoDuration = hiddenPlayerRef.current?.getDuration() ?? 0
      const time = percentage * videoDuration

      setHoverTime(time)
      captureSnapshot(time)
    }
  }

  return (
    <div className="relative">
      <ReactPlayer
        {...playerProps}
        ref={playerRef}
        config={{ file: { attributes: { controlsList: 'nodownload', crossOrigin: 'true' } } }}
        controls
        url={src}
        playing={isPlaying}
        onPause={handlePause}
        onPlay={() => setIsPlaying(true)}
        style={{ width: '100%', height: '100%' }}
        onReady={() => {
          if (secondsToSeek && !isSeeked) {
            playerRef.current?.seekTo(secondsToSeek, 'seconds')
            setIsSeeked(true)
          }
        }}
        playIcon={
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-foreground"
            onClick={() => setIsPlaying(true)}
          >
            <PlayIcon className="text-background" />
          </div>
        }
        light={thumbnail}
      />
      <ReactPlayer
        {...playerProps}
        ref={hiddenPlayerRef}
        config={{ file: { attributes: { crossOrigin: 'true' } } }}
        url={src}
        style={{ display: 'none' }}
      />
      <div className="absolute bottom-0 hidden w-full px-4 lg:block">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="h-8 cursor-pointer bg-transparent"
          onClick={() => {
            const player = playerRef.current?.getInternalPlayer()
            if (player) {
              player.currentTime = hoverTime
            }
          }}
          onMouseMove={handleProgressHover}
          onMouseLeave={() => {
            setSnapshot(null)
            setHoverTime(null)
          }}
        >
          {snapshot && hoverTime && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={snapshot}
              alt="snapshot"
              className="absolute bottom-10 h-auto w-[220px] -translate-x-1/2"
              style={{
                left: `${(hoverTime / (playerRef.current?.getDuration() ?? 0)) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
