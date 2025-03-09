import React, { useState, useEffect } from 'react';
import Select from './Select';
import axios from 'axios';
import { Pokemon } from '../types';

// interface FormProps {
// 	// Add props if needed
// }

// const Form: React.FC<FormProps> = () => {
// 	const [firstName, setFirstName] = useState('');
// 	const [lastName, setLastName] = useState('');
// 	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon[]>([]);
// 	const [pokemonOptions, setPokemonOptions] = useState<Pokemon[]>([]);

// 	const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setFirstName(event.target.value);
// 	};

// 	const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setLastName(event.target.value);
// 	};

// 	const handlePokemonSelect = (pokemon: Pokemon) => {
// 		setSelectedPokemon((prevPokemon) => [...prevPokemon, pokemon]);
// 	};

// 	useEffect(() => {
// 		axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
// 			.then(response => {
// 				const pokemonData = response.data.results;
// 				const pokemonOptions = pokemonData.map((pokemon: any) => ({
// 					id: pokemon.id,
// 					name: pokemon.name,
// 					sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
// 				}));
// 				setPokemonOptions(pokemonOptions);
// 			})
// 			.catch(error => {
// 				console.error(error);
// 			});
// 	}, []);

// 	return (
// 		<form className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
// 			<div className="mb-4">
// 				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
// 					First Name
// 				</label>
// 				<input
// 					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					id="firstName"
// 					type="text"
// 					value={firstName}
// 					onChange={handleFirstNameChange}
// 				/>
// 			</div>
// 			<div className="mb-4">
// 				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
// 					Last Name
// 				</label>
// 				<input
// 					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
// 					id="lastName"
// 					type="text"
// 					value={lastName}
// 					onChange={handleLastNameChange}
// 				/>
// 			</div>
// 			<div className="mb-4">
// 				<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pokemon">
// 					Select Pokémon
// 				</label>
// 				<Select
// 					options={pokemonOptions}
// 					value={selectedPokemon}
// 					onChange={handlePokemonSelect}
// 				/>
// 			</div>
// 		</form>
// 	);
// };

// export default Form;


interface FormProps {
	// Add props if needed
}

const Form: React.FC<FormProps> = () => {
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
	const [pokemonOptions, setPokemonOptions] = useState<Pokemon[]>([]);

	const handlePokemonSelect = (pokemon: Pokemon) => {
		setSelectedPokemon(pokemon);
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
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<form>
			<Select options={pokemonOptions} onChange={handlePokemonSelect} />
			{selectedPokemon && (
				<div>
					<h2>Selected Pokémon: {selectedPokemon.name}</h2>
					<img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
				</div>
			)}
		</form>
	);
};

export default Form;