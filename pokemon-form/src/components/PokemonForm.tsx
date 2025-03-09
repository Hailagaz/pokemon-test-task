import PokemonSelect from './PokemonSelect.tsx'

export default function PokemonForm() {
	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="Company logo"
						src="../assets/logos/LunaEdgeLogo.svg"
						className="mx-auto h-10 w-auto"
					/>
					<h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
						Pokemon Trainer Tower
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form action="#" method="POST" className="space-y-6">
						<div>
							<label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
								First name
							</label>
							<div className="mt-2">
								<input
									id="first-name"
									name="first-name"
									type="text"
									autoComplete="given-name"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
								Last name
							</label>
							<div className="mt-2">
								<input
									id="last-name"
									name="last-name"
									type="text"
									autoComplete="family-name"
									className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>

						<PokemonSelect />

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
