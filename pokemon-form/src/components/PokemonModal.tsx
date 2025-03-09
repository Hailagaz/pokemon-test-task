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
	}[]
}

export default function PokemonModal({ isOpen, onClose, trainerName, trainerLastName, selectedPokemons }: ModalProps) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<div className="fixed inset-0 bg-black bg-opacity-50" />
				<div className="fixed inset-0 flex items-center justify-center">
					<Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
						<Dialog.Title className="text-lg font-bold text-gray-900">Trainer Info</Dialog.Title>
						<p className="mt-2 text-gray-700">
							Trainer: <strong>{trainerName} {trainerLastName}</strong>
						</p>

						{/* Pokémon List */}
						<div className="mt-4 space-y-3">
							{selectedPokemons.map((pokemon) => (
								<div key={pokemon.id} className="flex items-center space-x-3 border p-2 rounded-md">
									<img src={pokemon.sprite} alt={pokemon.name} className="w-12 h-12" />
									<p className="text-lg font-semibold">{pokemon.name}</p>
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