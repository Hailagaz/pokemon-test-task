import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon } from '../types';

interface FormProps {
	// Add props if needed
}

const Form: React.FC<FormProps> = () => {
	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
	const [pokemonOptions, setPokemonOptions] = useState<Pokemon[]>([]);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const handlePokemonSelect = (pokemon: Pokemon) => {
		if (selectedPokemons.length < 4) {
			setSelectedPokemons([...selectedPokemons, pokemon]);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('Form submitted:', name, email, selectedPokemons);
	};

	const handleRemovePokemon = (pokemon: Pokemon) => {
		setSelectedPokemons(selectedPokemons.filter((p) => p.id !== pokemon.id));
	};

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
			.then(response => {
				const pokemonData = response.data.results;
				const pokemonOptions = pokemonData.map((pokemon: any) => ({
					id: pokemon.id,
					name: pokemon.name,
					sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
				}));
				setPokemonOptions(pokemonOptions);
			});
	}, []);

	return (
		<div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
			<h2 className="text-lg font-bold mb-4">Pokémon Form</h2>
			<form onSubmit={handleSubmit} className="flex flex-col">
				<label className="block mb-2" htmlFor="name">
					Name:
				</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="block w-full p-2 mb-4 border border-gray-400 rounded"
				/>
				<label className="block mb-2" htmlFor="email">
					Email:
				</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="block w-full p-2 mb-4 border border-gray-400 rounded"
				/>
				<select
					key="pokemon-select"
					value={''}
					onChange={(e) => {
						const selectedPokemon = pokemonOptions.find((pokemon) => pokemon.id === parseInt(e.target.value));
						console.log('Selected Pokémon:', selectedPokemon);
						if (selectedPokemon !== undefined) {
							handlePokemonSelect(selectedPokemon);
						}
					}}
					className="block w-full p-2 mb-4 border border-gray-400 rounded"
				>
					<option key="default" value="">Select a Pokémon</option>
					{pokemonOptions.map((pokemon) => (
						<option key={pokemon.id} value={pokemon.id}>
							{pokemon.name}
						</option>
					))}
				</select>
				<div className="mb-4">
					<h3 className="text-lg font-bold mb-2">Selected Pokémon:</h3>
					<ul>
						{selectedPokemons.map((pokemon) => (
							<li key={pokemon.id} className="py-2">
								{pokemon.name}
								<button
									className="ml-2 text-red-500 hover:text-red-700"
									onClick={() => handleRemovePokemon(pokemon)}
								>
									Remove
								</button>
							</li>
						))}
					</ul>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;