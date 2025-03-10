'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import PokemonSelect from './PokemonSelect.tsx'
import PokemonModal from './PokemonModal' // ✅ Import Modal
import logo from '../assets/logos/LunaEdgeLogo.svg'

// ✅ Define Type for Pokémon
interface Pokemon {
	id: number
	name: string
	avatar: string
	sprite: string
	types: string[]
	abilities: string[]
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
	const [isModalOpen, setIsModalOpen] = useState(false) // ✅ Modal state
	const [trainerName, setTrainerName] = useState('')
	const [trainerLastName, setTrainerLastName] = useState('')

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

	// ✅ Handle Form Submission
	const onSubmit: SubmitHandler<FormData> = (data) => {
		setTrainerName(data.firstName)
		setTrainerLastName(data.lastName)
		setIsModalOpen(true) // ✅ Show Modal
	}
	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 rounded-md
		shadow-md bg-gradient-to-r from-indigo-500 to-purple-500 bg-size-200 bg-pos-0">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img alt="Company logo" src={logo} className="mx-auto h-10 w-auto" />
				<h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">Pokémon Trainer Tower</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* First Name */}
					<div>
						<label className="block text-sm font-medium text-white">First name</label>
						<input
							{...register('firstName', { required: true, minLength: 2, maxLength: 12, pattern: /^[a-zA-Z]+$/ })}
							className="bg-white block w-full rounded-md border px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
						/>
						{errors.firstName && <p className="text-red-500 text-sm">First name must be 2-12 letters.</p>}
					</div>

					{/* Last Name */}
					<div>
						<label className="block text-sm font-medium text-white">Last name</label>
						<input
							{...register('lastName', { required: true, minLength: 2, maxLength: 12, pattern: /^[a-zA-Z]+$/ })}
							className="bg-white block w-full rounded-md border px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-indigo-600 sm:text-sm"
						/>
						{errors.lastName && <p className="text-red-500 text-sm">Last name must be 2-12 letters.</p>}
					</div>

					{/* Pokémon Select */}
					<PokemonSelect selectedPokemons={selectedPokemons} setSelectedPokemons={setSelectedPokemons} />

					{/* Submit Button */}
					<button
						type="submit"
						className={`w-full rounded-md px-5 py-2 text-sm font-semibold text-white transition-colors duration-300 border border-transparent
							 ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
							}`}
						disabled={!isFormValid}
					>
						Submit
					</button>
				</form>
			</div>

			{/* ✅ Modal Window */}
			<PokemonModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				trainerName={trainerName}
				trainerLastName={trainerLastName}
				selectedPokemons={selectedPokemons}
			/>
		</div>
	)
}