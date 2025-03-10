import { Meta, StoryObj } from '@storybook/react'
import PokemonSelect from './PokemonSelect'

// Mock Pokémon Data for Storybook
const mockPokemon = [
	{ id: 1, name: 'Bulbasaur', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png', types: ['grass', 'poison'], abilities: ['overgrow'] },
	{ id: 4, name: 'Charmander', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png', types: ['fire'], abilities: ['blaze'] },
	{ id: 7, name: 'Squirtle', avatar: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png', types: ['water'], abilities: ['torrent'] }
]

const meta: Meta<typeof PokemonSelect> = {
	title: 'Components/PokemonSelect',
	component: PokemonSelect,
	argTypes: {
		selectedPokemons: { control: 'object' },
		setSelectedPokemons: { action: 'setSelectedPokemons' }
	}
}

export default meta
type Story = StoryObj<typeof PokemonSelect>

export const Default: Story = {
	args: {
		selectedPokemons: [],
		setSelectedPokemons: () => { }
	}
}

export const WithSelectedPokemon: Story = {
	args: {
		selectedPokemons: [mockPokemon[0], mockPokemon[1]],
		setSelectedPokemons: () => { }
	}
}