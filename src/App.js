import { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NoteBox from "./components/NoteBox/NoteBox";
import Pocket from "./components/Pocket/Pocket";


function App() {

	const [selected, setSelected] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);

	const getSelected = (selected) => {
		setSelected(selected)
	}
	  
	return (
		
		     <div className="flex w-[100vw] h-[100vh] overflow-hidden lg:block">
			   <Pocket onSubmitApp={getSelected} isActive={activeIndex === 0}  setActiveIndex={setActiveIndex}   />
			   <NoteBox selected={selected} isActive={activeIndex !== 0} setActiveIndex={setActiveIndex} />
			   {/* <Route path="notebox" element={<NoteBox selected={selected} setBack = {handleGoBack} />} /> */}
		    </div>
	
	);
}

export default App;