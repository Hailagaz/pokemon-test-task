'use client'

import { useState, useEffect } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios'

// ✅ Define Type for Pokémon
interface Pokemon {
	id: number
	name: string
	avatar: string
	sprite: string
}

// ✅ Props for Passing Selected Pokémon State
interface PokemonSelectProps {
	selectedPokemons: Pokemon[]
	setSelectedPokemons: (pokemons: Pokemon[]) => void
}

export default function PokemonSelect({ selectedPokemons, setSelectedPokemons }: PokemonSelectProps) {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([])

	// ✅ Fetch Pokémon List
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
						}
					})
				)
				setPokemonList(pokemonDetails)
			} catch (error) {
				console.error('Error fetching Pokémon:', error)
			}
		}

		fetchPokemon()
	}, [])

	// ✅ Selection Handler (Max 4 Pokémon)
	const handleSelectionChange = (selectedValues: Pokemon[]) => {
		if (selectedValues.length > 4) return
		setSelectedPokemons(selectedValues)
	}

	return (
		<Listbox value={selectedPokemons} onChange={handleSelectionChange} multiple>
			<Label className="block text-sm font-medium text-gray-900">Select your Pokémon team (max 4)</Label>
			<div className="relative mt-2">
				<ListboxButton className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
					<div className="flex gap-2">
						{selectedPokemons.length > 0 ? (
							selectedPokemons.map((pokemon) => (
								<img key={pokemon.id} src={pokemon.avatar} alt={pokemon.name} className="w-6 h-6 rounded-full" />
							))
						) : (
							<span className="text-gray-500">Select Pokémon</span>
						)}
					</div>
					<ChevronUpDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
				</ListboxButton>

				<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg ring-1 ring-black/5 overflow-auto rounded-md py-1 text-base focus:outline-none sm:text-sm">
					{pokemonList.map((pokemon) => (
						<ListboxOption
							key={pokemon.id}
							value={pokemon}
							className={({ active }) =>
								`cursor-pointer select-none py-2 px-4 flex items-center justify-between ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'}`
							}
						>
							<div className="flex items-center">
								<img src={pokemon.avatar} alt={pokemon.name} className="w-6 h-6 rounded-full mr-2" />
								<span>{pokemon.name}</span>
							</div>
							{selectedPokemons.some((p) => p.id === pokemon.id) && <CheckIcon className="w-5 h-5 text-indigo-500" />}
						</ListboxOption>
					))}
				</ListboxOptions>
			</div>
		</Listbox>
	)
}