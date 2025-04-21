import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

export interface RatingProps {
  fullIcon?: React.ReactNode
  emptyIcon?: React.ReactNode
  initialRating?: number
  onHover?: (rating: number) => void
  onChange?: (rating: number) => void
}

export const Rating: React.FC<RatingProps> = ({
  fullIcon = <Star className="text-foreground" fill="currentColor" />,
  emptyIcon = <Star className="text-foreground" />,
  initialRating = 0,
  onHover,
  onChange,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(initialRating)

  const handleMouseOver = (rating: number) => {
    setHoveredRating(rating)
  }
  const handleMouseOut = () => {
    setHoveredRating(0)
  }
  const handleClick = (rating: number) => {
    setSelectedRating(rating)
  }

  useEffect(() => {
    onHover?.(hoveredRating)
  }, [hoveredRating, onHover])
  useEffect(() => {
    onChange?.(selectedRating)
  }, [selectedRating, onChange])

  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => index + 1).map((rating) => (
        <button
          type="button"
          key={rating}
          onMouseOver={() => handleMouseOver(rating)}
          onFocus={() => handleMouseOver(rating)}
          onMouseOut={handleMouseOut}
          onBlur={handleMouseOut}
          onClick={() => handleClick(rating)}
        >
          {hoveredRating >= rating || selectedRating >= rating ? fullIcon : emptyIcon}
        </button>
      ))}
    </div>
  )
}
