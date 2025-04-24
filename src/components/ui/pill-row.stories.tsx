import { Meta, StoryObj } from '@storybook/react'
import { Pill } from './pill'
import { PillRow } from './pill-row'

const PillNames = [
  'All',
  'Cooking recipes',
  'Baking recipes',
  'Dessert recipes',
  'Vegetarian recipes',
  'Vegan recipes',
  'Gluten-free recipes',
  'Dairy-free recipes',
  'Low-carb recipes',
  'High-protein recipes',
  'Quick recipes',
  'Easy recipes',
  'Healthy recipes',
  'Breakfast recipes',
  'Lunch recipes',
  'Dinner recipes',
  'Snack recipes',
  'Appetizer recipes',
  'Side dish recipes',
  'Drink recipes',
  'Cocktail recipes',
  'Smoothie recipes',
  'Soup recipes',
  'Salad recipes',
  'Sandwich recipes',
  'Burger recipes',
  'Pizza recipes',
  'Pasta recipes',
  'Rice recipes',
  'Noodle recipes',
]

const PillRowStory = () => (
  <PillRow>
    {PillNames.map((name) => (
      <Pill key={name}>{name}</Pill>
    ))}
  </PillRow>
)

type Story = StoryObj<typeof PillRowStory>

export const Default: Story = {
  render: () => <PillRowStory />,
}

const meta: Meta<typeof PillRowStory> = {
  title: 'Components/PillRow/PillRow',
  component: PillRowStory,
}

export default meta
