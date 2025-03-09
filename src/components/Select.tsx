// import React, { useState } from 'react';
// import { Pokemon } from '../types';

// interface SelectProps {
// 	options: Pokemon[];
// 	value: Pokemon;
// 	onChange: (pokemon: Pokemon) => void;
// }

// const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
// 	const [isOpen, setIsOpen] = useState(false);

// 	const handleToggle = () => {
// 		setIsOpen(!isOpen);
// 	};

// 	const handleSelect = (option: string) => {
// 		onChange(option);
// 		setIsOpen(false);
// 	};

// 	return (
// 		<div className="relative">
// 			<button
// 				className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-left cursor-pointer"
// 				onClick={handleToggle}
// 			>
// 				{value}
// 			</button>
// 			{isOpen && (
// 				<ul className="absolute bg-white border border-gray-300 rounded-md py-2">
// 					{options.map((option) => (
// 						<li key={option} className="py-2 pl-3 pr-10 cursor-pointer">
// 							<button onClick={() => handleSelect(option)}>{option}</button>
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default Select;


import React from 'react';
import { Pokemon } from '../types';

// interface SelectProps {
// 	options: Pokemon[];
// 	value: Pokemon[];
// 	onChange: (pokemon: Pokemon) => void;
// }

// const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
// 	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
// 		const selectedPokemon = options.find((pokemon) => pokemon.id === parseInt(event.target.value));
// 		if (selectedPokemon) {
// 			onChange(selectedPokemon);
// 		}
// 	};

// 	return (
// 		<select value={value.id} onChange={handleChange}>
// 			{options.map((pokemon) => (
// 				<option key={pokemon.id} value={pokemon.id}>
// 					{pokemon.name}
// 				</option>
// 			))}
// 		</select>
// 	);
// };

// export default Select;


interface SelectProps {
	options: Pokemon[];
	onChange: (pokemon: Pokemon) => void;
}

const Select: React.FC<SelectProps> = ({ options, onChange }) => {
	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedPokemon = options.find((pokemon) => pokemon.id === parseInt(event.target.value));
		if (selectedPokemon) {
			onChange(selectedPokemon);
		}
	};

	return (
		<select onChange={handleChange}>
			<option value="">Select a Pokémon</option>
			{options.map((pokemon) => (
				<option key={pokemon.id} value={pokemon.id}>
					{pokemon.name}
				</option>
			))}
		</select>
	);
};

export default Select;