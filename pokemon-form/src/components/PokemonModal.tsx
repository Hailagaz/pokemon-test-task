'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

// ✅ Modal Props
interface ModalProps {
	isOpen: boolean
	onClose: () => void
	trainerName: string
	trainerLastName: string
	selectedPokemons: {
		id: number
		name: string
		sprite: string
		types: string[]
		abilities: string[]
	}[]
}

export default function PokemonModal({ isOpen, onClose, trainerName, trainerLastName, selectedPokemons }: ModalProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<div className="fixed inset-0 bg-black bg-opacity-50" />
				<div className="fixed inset-0 flex items-center justify-center">
					<Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
						<Dialog.Title className="text-lg font-bold text-gray-900">Trainer Info</Dialog.Title>
						<p className="mt-2 text-gray-700">
							Trainer: <strong>{trainerName} {trainerLastName}</strong>
						</p>

						{/* Pokémon List */}
						<div className="mt-4 space-y-4">
							<h3 className="text-lg font-bold text-gray-900">Selected Pokemons</h3>
							{selectedPokemons.map((pokemon) => (
								<div key={pokemon.id} className="flex items-center border p-3 rounded-lg shadow-sm">
									<img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24 rounded-md" />
									<div className="ml-4">
										<p className="text-xl font-bold text-gray-900">{pokemon.name}</p>

										{/* Pokémon Types */}
										<div className="flex space-x-2 mt-1">
											{pokemon.types.map((type) => (
												<span key={type} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-md">
													{type}
												</span>
											))}
										</div>

										{/* Pokémon Abilities */}
										<p className="mt-2 text-sm text-gray-700">
											<strong>Abilities:</strong> {pokemon.abilities.join(', ')}
										</p>
									</div>
								</div>
							))}
						</div>

						{/* Close Button */}
						<div className="mt-4">
							<button onClick={onClose} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
								Close
							</button>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</Transition>
	)
}