import React from "react";
import PokemonSelect from "./components/PokemonSelect";

const App: React.FC = () => {
	return (
		<div className="p-6 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Pokemon Trainer Form</h1>
			<PokemonSelect />
		</div>
	);
};

export default App;