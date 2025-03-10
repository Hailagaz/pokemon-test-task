import { Meta, StoryObj } from '@storybook/react';
import PokemonSelect from './PokemonSelect';

// Mock Pokémon Data for Storybook
const mockPokemon = [
	{ id: 1, name: 'Bulbasaur', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', types: ['grass', 'poison'], abilities: ['overgrow'] },
	{ id: 4, name: 'Charmander', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', types: ['fire'], abilities: ['blaze'] },
	{ id: 7, name: 'Squirtle', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', types: ['water'], abilities: ['torrent'] },
	{ id: 25, name: 'Pikachu', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', types: ['electric'], abilities: ['static'] }
];

const meta: Meta<typeof PokemonSelect> = {
	title: 'Components/PokemonSelect',
	component: PokemonSelect,
	tags: ['autodocs'], // Enables auto-documentation
	argTypes: {
		selectedPokemons: { control: 'object' },
		setSelectedPokemons: { action: 'setSelectedPokemons' }
	}
};

export default meta;
type Story = StoryObj<typeof PokemonSelect>;

export const Default: Story = {
	args: {
		selectedPokemons: [],
		setSelectedPokemons: () => { }
	},
	render: (args) => (
		<div className="p-6 max-w-md mx-auto rounded-lg shadow-md bg-linear-to-r from-cyan-700 via-blue-500 to-indigo-600">
			<PokemonSelect {...args} />
		</div>
	),
};

export const WithSelectedPokemon: Story = {
	args: {
		selectedPokemons: [mockPokemon[0], mockPokemon[1]],
		setSelectedPokemons: () => { }
	},
	render: (args) => (
		<div className="p-6 max-w-md mx-auto rounded-lg shadow-md bg-linear-to-r from-cyan-700 via-blue-500 to-indigo-600">
			<PokemonSelect {...args} />
		</div>
	),
};

export const FullSelection: Story = {
	args: {
		selectedPokemons: [mockPokemon[0], mockPokemon[1], mockPokemon[2], mockPokemon[3]],
		setSelectedPokemons: () => { }
	},
	render: (args) => (
		<div className="p-6 max-w-md mx-auto rounded-lg shadow-md bg-linear-to-r from-cyan-700 via-blue-500 to-indigo-600">
			<PokemonSelect {...args} />
		</div>
	),
};