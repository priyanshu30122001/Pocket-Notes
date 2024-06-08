import React, { useState } from "react";

const NewGroup = (props) => {
	const colorOptions = [
		{
			id: 1,
			value: "#0047ff",
		},
		{
			id: 2,
			value: "#b38bfa",
		},
		{
			id: 3,
			value: "#ff79f2",
		},
		{
			id: 4,
			value: "#43e6fc",
		},
		{
			id: 5,
			value: "#f19576",
		},
		{
			id: 6,
			value: "#6691ff",
		},
	];

	const [selectedColor, setSelectedColor] = useState("#0047ff");
	const [group, setGroup] = useState(false);
	const [name, setName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleColorChange = (colorValue) => {
		setSelectedColor(colorValue);
	};

	const addGroup = async (event) => {
		event.preventDefault();

		if (name && selectedColor) {
			const words = name.split(" ");

			const firstLetterFirstWord = words[0] ? words[0][0] : "";

			const lastWordIndex = words.length - 1;
			const firstLetterLastWord = words[lastWordIndex]
				? words[lastWordIndex][0]
				: "";
			let logoName = "";
			if (lastWordIndex > 0) {
				logoName = (firstLetterFirstWord + firstLetterLastWord).toUpperCase();
			} else {
				logoName = firstLetterFirstWord.toUpperCase();
			}

			const newGroup = [logoName, name, selectedColor];
			const existingGroups =
				JSON.parse(localStorage.getItem("pocketGroup")) || [];

			const nameExists = existingGroups.some((group) => group[1] === name);

			if (nameExists) {
				setErrorMessage("Group with this name already exists!");
			} else {
				if (existingGroups.length === 0) {
					localStorage.setItem("pocketGroup", JSON.stringify([newGroup]));
				} else {
					localStorage.setItem(
						"pocketGroup",
						JSON.stringify([...existingGroups, newGroup])
					);
				}
				const newNoteGroups =
					JSON.parse(localStorage.getItem("pocketGroup")) || [];
				props.newGroup(newNoteGroups);
				setErrorMessage("");
				setName("");
				setGroup(false);
			}
		}
	};

	return (
		<>
			<div
				className="bg-black text-white text-xl font-medium rounded-full w-max px-4 py-1 ml-4 cursor-pointer"
				onClick={() => (group ? setGroup(false) : setGroup(true))}
			>
				+ Create Notes group
			</div>
			
			{group ? (
				<div className="fixed top-0 left-0 flex items-center justify-center w-[100vw] h-[100vh] bg-[#2f2f2fbf] z-[110]  ">
					<div className="relative bg-[#FFFFFF] w-[700px] h-[317px] rounded-md flex flex-col font-medium px-[35px] pt-[40px] pb-[30px] lg:w-[80%] lg:h-[30vh] lg:px-[15px] ">
						<h2 className="font-medium text-[27px] mb-[45px] lg:text-[1.5rem] lg:text-center lg:mb-[25px]">Create New group</h2>
						<form onSubmit={addGroup}>
							<div className="flex items-center relative mb-[30px] lg:justify-center lg:mb-[15px]">
								<div className="font-medium text-[23px] mr-[25px] lg:text-[14px] lg:font-bold ">Group Name</div>
								<input
									type="text"
									value={name}
									onChange={(event) => {
										setName(event.target.value);
									}}
									required
									placeholder="Enter group name"
									className="relative w-[70%] h-[41px] text-[20px] rounded-full border-[2px] border-solid border-[#CCCCCC] pl-[40px] lg:text-[14px] lg:w-[50%] lg:pl-[10px] lg:h-[23px]"
								/>
								<p className="text-[12px] text-red-600 absolute bottom-[-4vh] left-[15vw]  lg:text-[10px] lg:absolute lg:bottom-[20px]   ">{errorMessage}</p>
							</div>
							
							<div className="flex items-center relative mb-[25px] lg:justify-center lg:mb-[10px]">
								<div className="font-medium text-[23px] mr-[25px] lg:text-[14px] lg:font-bold ">Choose colour</div>
								<div className="flex">
									{colorOptions.map((color) => (
										<div key={color.id}>
											<input
											    className="w-[40px] hidden "
												type="radio"
												id={color.id}
												name="fav_color"
												value={color.value}
												checked={selectedColor === color.value}
												onChange={() => handleColorChange(color.value)}
											/>
											<label
												className="w-[40px] h-[40px] rounded-full flex items-center justify-center mr-[20px] text-[30px] text-[#00000056] hover:shadow-[-5px_-5px_15px_4px_rgba(0,0,0,0.1),_5px_5px_15px_4px_rgba(0,0,0,0.15)] cursor-pointer lg:w-[17px] lg:h-[17px] lg:mr-[8px] "
												style={{ backgroundColor: color.value }}
												htmlFor={color.id}
											>
											</label>
										</div>
									))}
								</div>
							</div>
							<button type="submit" className="bg-[#000000] absolute bottom-[20px] right-[20px] text-[#FFFFFF] px-[50px] py-[5px] rounded-lg text-[18px] border-none cursor-pointer lg:right-[60px] ">
								Create
							</button>

							<div
								className="absolute top-[10px] right-[30px] text-[#000000af] text-3xl font-[400px] cursor-pointer  "
								onClick={() => setGroup(false)}
							>
								<span>x</span>
							</div>
						</form>
					</div>
				</div>
			) : (
				""
			)}
		</>
	);
};

export default NewGroup;