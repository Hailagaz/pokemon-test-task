'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

const people = [
	{
		id: 1,
		name: 'Wade Cooper',
		avatar:
			'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 2,
		name: 'Arlene Mccoy',
		avatar:
			'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 3,
		name: 'Devon Webb',
		avatar:
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
	},
	{
		id: 4,
		name: 'Tom Cook',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 5,
		name: 'Tanya Fox',
		avatar:
			'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 6,
		name: 'Hellen Schmidt',
		avatar:
			'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 7,
		name: 'Caroline Schultz',
		avatar:
			'https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 8,
		name: 'Mason Heaney',
		avatar:
			'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 9,
		name: 'Claudie Smitham',
		avatar:
			'https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
	{
		id: 10,
		name: 'Emil Schaefer',
		avatar:
			'https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	},
]

export default function PokemonSelect() {
	const [selectedPeople, setSelectedPeople] = useState<typeof people>([]);

	const handleSelectionChange = (selectedValues: typeof people) => {
		// If selection exceeds 4, keep previous state
		if (selectedValues.length > 4) return;
		setSelectedPeople(selectedValues);
	};

	return (
		<Listbox value={selectedPeople} onChange={handleSelectionChange} multiple>
			<Label className="block text-sm font-medium text-gray-900">Select your team (max 4)</Label>
			<div className="relative mt-2">
				<ListboxButton className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
					<div className="flex gap-2">
						{selectedPeople.length > 0 ? (
							selectedPeople.map((person) => (
								<img key={person.id} src={person.avatar} alt={person.name} className="w-6 h-6 rounded-full" />
							))
						) : (
							<span className="text-gray-500">Select Pokémon</span>
						)}
					</div>
					<ChevronUpDownIcon className="w-5 h-5 text-gray-500" aria-hidden="true" />
				</ListboxButton>

				<ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full bg-white shadow-lg ring-1 ring-black/5 overflow-auto rounded-md py-1 text-base focus:outline-none sm:text-sm">
					{people.map((person) => (
						<ListboxOption
							key={person.id}
							value={person}
							className={({ active }) =>
								`cursor-pointer select-none py-2 px-4 flex items-center justify-between ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
								}`
							}
						>
							<div className="flex items-center">
								<img src={person.avatar} alt={person.name} className="w-6 h-6 rounded-full mr-2" />
								<span>{person.name}</span>
							</div>
							{selectedPeople.some((p) => p.id === person.id) && <CheckIcon className="w-5 h-5 text-indigo-500" />}
						</ListboxOption>
					))}
				</ListboxOptions>
			</div>
		</Listbox>
	);
}