import { useForm } from "react-hook-form";
import PokemonSelect from "./PokemonSelect";

const PokemonForm = () => {
	const { register, handleSubmit, formState: { errors }, watch } = useForm();

	const onSubmit = (data: any) => {
		console.log("Form Submitted:", data);
	};

	return (
		<div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-2xl font-bold mb-4">Pokémon Trainer Form</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				{/* First Name Input */}
				<div>
					<label className="block font-semibold">First Name:</label>
					<input
						{...register("firstName", {
							required: "First name is required",
							minLength: { value: 2, message: "Must be at least 2 characters" },
							maxLength: { value: 12, message: "Max 12 characters allowed" },
							pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" }
						})}
						className="w-full p-2 border rounded"
						type="text"
						placeholder="Enter first name"
					/>
					{errors.firstName && <p className="text-red-500">{String(errors.firstName.message)}</p>}
				</div>

				{/* Last Name Input */}
				<div>
					<label className="block font-semibold">Last Name:</label>
					<input
						{...register("lastName", {
							required: "Last name is required",
							minLength: { value: 2, message: "Must be at least 2 characters" },
							maxLength: { value: 12, message: "Max 12 characters allowed" },
							pattern: { value: /^[A-Za-z]+$/, message: "Only letters allowed" }
						})}
						className="w-full p-2 border rounded"
						type="text"
						placeholder="Enter last name"
					/>
					{errors.lastName && <p className="text-red-500">{String(errors.lastName.message)}</p>}
				</div>

				{/* Pokémon Selection */}
				<div>
					<label className="block font-semibold">Select Your Pokémon Team:</label>
					<PokemonSelect />
				</div>

				{/* Submit Button */}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
				>
					Submit Team
				</button>
			</form>
		</div>
	);
};

export default PokemonForm;