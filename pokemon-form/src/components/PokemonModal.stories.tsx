import { Meta, StoryObj } from '@storybook/react';
import PokemonModal from './PokemonModal';

// Mock Pokémon data
const mockSelectedPokemons = [
	{
		id: 1,
		name: 'Bulbasaur',
		sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
		types: ['grass', 'poison'],
		abilities: ['overgrow'],
	},
	{
		id: 4,
		name: 'Charmander',
		sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
		types: ['fire'],
		abilities: ['blaze'],
	},
	{
		id: 7,
		name: 'Squirtle',
		sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
		types: ['water'],
		abilities: ['torrent'],
	},
	{
		id: 25,
		name: 'Pikachu',
		sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
		types: ['electric'],
		abilities: ['static'],
	},
];

// Storybook metadata
const meta: Meta<typeof PokemonModal> = {
	title: 'Components/PokemonModal',
	component: PokemonModal,
	tags: ['autodocs'],
	argTypes: {
		isOpen: { control: 'boolean' },
		onClose: { action: 'onClose' },
	},
};

export default meta;
type Story = StoryObj<typeof PokemonModal>;

// Default modal (closed)
export const Closed: Story = {
	args: {
		isOpen: false,
		trainerName: '',
		trainerLastName: '',
		selectedPokemons: [],
		onClose: () => { },
	},
};

// Modal with a selected team
export const WithPokemon: Story = {
	args: {
		isOpen: true,
		trainerName: 'Ash',
		trainerLastName: 'Ketchum',
		selectedPokemons: mockSelectedPokemons,
		onClose: () => { },
	},
};