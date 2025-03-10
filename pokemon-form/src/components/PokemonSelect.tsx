'use client'

import { useState, useEffect } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios'

// Define Type for Pokemon
interface Pokemon {
	id: number
	name: string
	avatar: string
	sprite: string
	types: string[]
	abilities: string[]
}

// Props for Passing Selected Pokemon State
interface PokemonSelectProps {
	selectedPokemons: Pokemon[]
	setSelectedPokemons: (pokemons: Pokemon[]) => void
}

export default function PokemonSelect({ selectedPokemons, setSelectedPokemons }: PokemonSelectProps) {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
	const [search, setSearch] = useState<string>('') // Search Input State
	const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]) // Filtered Pokemon List

	// Fetch Pokemon List
	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
				const results = response.data.results

				const pokemonDetails = await Promise.all(
					results.map(async (pokemon: { name: string; url: string }) => {
						const details = await axios.get(pokemon.url)
						return {
							id: details.data.id,
							name: details.data.name,
							avatar: details.data.sprites.front_default,
							sprite: details.data.sprites.other['official-artwork'].front_default,
							types: details.data.types.map((t: { type: { name: string } }) => t.type.name),
							abilities: details.data.abilities.map((a: { ability: { name: string } }) => a.ability.name),
						}
					})
				)
				setPokemonList(pokemonDetails)
				setFilteredPokemons(pokemonDetails) // Set initial filtered list
			} catch (error) {
				console.error('Error fetching Pokemon:', error)
			}
		}

		fetchPokemon()
	}, [])

	// Filter Pokemon List Based on Search Input
	useEffect(() => {
		if (search === '') {
			setFilteredPokemons(pokemonList) // Reset when search is cleared
		} else {
			setFilteredPokemons(
				pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
			)
		}
	}, [search, pokemonList])

	// Selection Handler (4 Pokemon)
	const handleSelectionChange = (selectedValues: Pokemon[]) => {
		if (selectedValues.length > 4) return
		setSelectedPokemons(selectedValues)
	}

	return (
		<div>
			<Listbox
				value={selectedPokemons}
				onChange={handleSelectionChange}
				multiple
			>
				<Label className="block text-sm font-medium text-white">Select your Pokemon team</Label>
				<div className="relative mt-2">
					<ListboxButton
						className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
					>
						<div className="flex gap-2">
							{selectedPokemons.length > 0 ? (
								selectedPokemons.map((pokemon) => (
									<img key={pokemon.id} src={pokemon.avatar} alt={pokemon.name} className="w-6 h-6 rounded-full" />
								))
							) : (
								<span className="text-gray-500">Select Pokemon</span>
							)}
						</div>
						<ChevronUpDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
					</ListboxButton>

					<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg ring-1 ring-black/5 overflow-auto rounded-md py-1 text-base focus:outline-none sm:text-sm">
						{/* Search Input */}
						<div className="px-3 py-2">
							<input
								type="text"
								placeholder="Search Pokemon..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="w-full border rounded-md p-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
							/>
						</div>

						{/* Filtered Pokemon List */}
						{filteredPokemons.map((pokemon) => (
							<ListboxOption
								key={pokemon.id}
								value={pokemon}
								className={({ active }) =>
									`cursor-pointer select-none py-2 px-4 flex items-center justify-between ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
									}`
								}
							>
								<div className="flex items-center">
									<img src={pokemon.avatar} alt={pokemon.name} className="w-6 h-6 rounded-full mr-2" />
									<span>{pokemon.name}</span>
								</div>
								{selectedPokemons.some((p) => p.id === pokemon.id) && <CheckIcon className="w-5 h-5 text-indigo-500" />}
							</ListboxOption>
						))}

						{/* No Results Found */}
						{filteredPokemons.length === 0 && (
							<div className="py-2 px-4 text-gray-500 text-center">No Pokemon found</div>
						)}
					</ListboxOptions>
				</div>
			</Listbox>

			{/* Show Warning After Interaction */}
			{selectedPokemons.length >= 1 && selectedPokemons.length < 4 && (
				<p className="text-red-500 text-sm mt-2">Select 4 Pokemon</p>
			)}
		</div>
	)
}