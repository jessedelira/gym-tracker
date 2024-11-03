import { type Exercise } from '@prisma/client';
import React, { useState } from 'react';

interface SearchableDropdownProps {
	exercises: Exercise[];
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
	exercises,
}) => {
	const [query, setQuery] = useState('');
	const [selectedExercise, setSelectedExercise] = useState('');
	const [searchResults, setSearchResults] = useState(exercises);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedExercise('');
		const searchTerm = e.target.value.toLowerCase();
		setQuery(searchTerm);
		setSearchResults(
			exercises.filter((exercise) =>
				exercise.name.toLowerCase().includes(searchTerm),
			),
		);

		console.log('searchResults', searchResults);
		console.log('searchTerm', searchTerm);
	};

	const handleItemClick = (item: Exercise) => {
		setSelectedExercise(item.name);
		setQuery(item.name);
	};

	return (
		<div className="relative w-64">
			{/* Input field */}
			<input
				type="text"
				placeholder="Search..."
				value={query}
				onChange={handleInputChange}
				className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>

			{/* Filtered list */}
			{!selectedExercise && (
				<ul className="absolute left-0 right-0 mt-2 max-h-48 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
					{searchResults.length > 0 ? (
						searchResults.map((item, index) => (
							<li
								key={index}
								className="cursor-pointer p-2 hover:bg-blue-100"
								onClick={() => handleItemClick(item)}
							>
								{item.name}
							</li>
						))
					) : (
						<li className="p-2 text-gray-500">No results found</li>
					)}
				</ul>
			)}
		</div>
	);
};

export default SearchableDropdown;
