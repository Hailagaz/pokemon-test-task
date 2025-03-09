'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import PokemonSelect from './PokemonSelect.tsx'

// ✅ Define Type for Pokémon
interface Pokemon {
	id: number
	name: string
	avatar: string
	sprite: string
}

// ✅ Define the expected form structure
interface FormData {
	firstName: string
	lastName: string
}

export default function PokemonForm() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onChange' })

	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([])

	const firstName = watch('firstName', '')
	const lastName = watch('lastName', '')

	// ✅ Check if Form is Valid
	const isFormValid =
		firstName.length >= 2 &&
		firstName.length <= 12 &&
		/^[a-zA-Z]+$/.test(firstName) &&
		lastName.length >= 2 &&
		lastName.length <= 12 &&
		/^[a-zA-Z]+$/.test(lastName) &&
		selectedPokemons.length === 4

	// ✅ Fix Type Error in Submit Function
	const onSubmit: SubmitHandler<FormData> = (data) => {
		alert(`Trainer: ${data.firstName} ${data.lastName}\nPokémon Team: ${selectedPokemons.map((p) => p.name).join(', ')}`)
	}

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-md">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img alt="Company logo" src="../assets/logos/LunaEdgeLogo.svg" className="mx-auto h-10 w-auto" />
				<h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Pokémon Trainer Tower</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* First Name */}
					<div>
						<label className="block text-sm font-medium text-gray-900">First name</label>
						<input
							{...register('firstName', { required: true, minLength: 2, maxLength: 12, pattern: /^[a-zA-Z]+$/ })}
							className="block w-full rounded-md border px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
						/>
						{errors.firstName && <p className="text-red-500 text-sm">First name must be 2-12 letters.</p>}
					</div>

					{/* Last Name */}
					<div>
						<label className="block text-sm font-medium text-gray-900">Last name</label>
						<input
							{...register('lastName', { required: true, minLength: 2, maxLength: 12, pattern: /^[a-zA-Z]+$/ })}
							className="block w-full rounded-md border px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
						/>
						{errors.lastName && <p className="text-red-500 text-sm">Last name must be 2-12 letters.</p>}
					</div>

					{/* Pokémon Select */}
					<PokemonSelect selectedPokemons={selectedPokemons} setSelectedPokemons={setSelectedPokemons} />

					{/* Pokémon Selection Warning */}
					{selectedPokemons.length !== 4 && <p className="text-red-500 text-sm">Select 4 Pokémon</p>}

					{/* Submit Button */}
					<button
						type="submit"
						className={`w-full rounded-md px-3 py-1.5 text-sm font-semibold text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-400 cursor-not-allowed'
							}`}
						disabled={!isFormValid}
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}