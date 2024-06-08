import { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NoteBox from "./components/NoteBox/NoteBox";
import Pocket from "./components/Pocket/Pocket";


function App() {

	const [selected, setSelected] = useState("");
	const [back, setBack] = useState(true)

	const getSelected = (selected) => {
		setSelected(selected)
	}

	const handleGoBack = (back) => {
		setBack(back)
	}


	return (
		
		     <div className="flex w-[100vw] h-[100vh] overflow-hidden lg:block">
			   <Pocket onSubmitApp={getSelected} back = {back} setBack = {handleGoBack} />
			   <NoteBox selected={selected} setBack = {handleGoBack}/>
			   {/* <Route path="notebox" element={<NoteBox selected={selected} setBack = {handleGoBack} />} /> */}
		    </div>
	
	);
}

export default App;