import React, { useState, useEffect } from "react";
import axios from "axios";

interface Pokemon {
	name: string;
	sprite: string;
}

const PokemonSelect: React.FC = () => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);

	// Fetch Pokemon Data
	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
				const pokemonData = await Promise.all(
					response.data.results.map(async (pokemon: { name: string; url: string }) => {
						const pokemonDetails = await axios.get(pokemon.url);
						return {
							name: pokemon.name,
							sprite: pokemonDetails.data.sprites.front_default, // Mini image
						};
					})
				);
				setPokemonList(pokemonData);
			} catch (error) {
				console.error("Error fetching Pokemon data:", error);
			}
		};
		fetchPokemon();
	}, []);

	return (
		<div>
			<h2 className="text-lg font-bold mb-2">Select Your Pokemon Team</h2>
			<select className="border p-2 rounded w-full">
				<option value="">Select a Pokemon...</option>
				{pokemonList.map((pokemon) => (
					<option key={pokemon.name} value={pokemon.name}>
						{pokemon.name}
					</option>
				))}
			</select>
		</div>
	);
};

export default PokemonSelect;