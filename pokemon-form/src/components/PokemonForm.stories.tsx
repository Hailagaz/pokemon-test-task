import { Meta, StoryObj } from '@storybook/react';
import PokemonForm from './PokemonForm';

// Storybook metadata
const meta: Meta<typeof PokemonForm> = {
	title: 'Components/PokemonForm',
	component: PokemonForm,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PokemonForm>;

// Default empty form
export const Default: Story = {
	render: () => (
		<div className="p-6 max-w-lg mx-auto rounded-lg shadow-md bg-gradient-to-r from-cyan-700 via-blue-500 to-indigo-600">
			<PokemonForm />
		</div>
	),
};