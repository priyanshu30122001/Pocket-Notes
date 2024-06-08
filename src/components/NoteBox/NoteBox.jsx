import React, { useEffect, useState } from "react";
import "./notebox.module.css";
import Img from "../../images/notes.png";
import arrow from "../../images/Vector.png";
import leftarrow from "../../images/leftarrow.png"
import lock from "../../images/lock.png"


const NoteSection = ({ noteGroup, selected ,setGoBacks}) => {
  const [myNote, setMyNote] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(selected)) || [];
    setMyNote(storedNotes);
  }, [selected]);

  const submitNote = async (event) => {
    event.preventDefault();

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const today = new Date();
    const day = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    let hours = today.getHours();
    let minutes = today.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? "0" + minutes : minutes;

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    const Note = [formattedTime,formattedDate,allNotes];


    const existingGroups = JSON.parse(localStorage.getItem(selected)) || [];

    if (existingGroups.length === 0) {
      localStorage.setItem(selected, JSON.stringify([Note]));
    } else {
      localStorage.setItem(selected, JSON.stringify([...existingGroups, Note]));
    }

    const updatedMyNote = JSON.parse(localStorage.getItem(selected)) || [];
    setMyNote(updatedMyNote);

    setAllNotes("");
  };
  const handleGoBack = () => {
    setGoBacks(true)
  }

  return (
    <>
      <div className="h-[12vh] w-[100%] text-[#ffffff] flex items-center bg-[#E8E8E8] lg:pl-[20px] lg:h-[8vh] " >
        <img src={leftarrow} alt="" className=" hidden  lg:block "  onClick={() => handleGoBack()}></img>
        <div className=" rounded-full flex items-center justify-center h-[60px] w-[60px] text-[30px] text-white font-medium mx-[30px] "style={{ backgroundColor: noteGroup[2] }} >
          {noteGroup[0]}
        </div>
        <div className="text-[25px] font-medium text-black">{noteGroup[1]}</div>
      </div>
      <div className="w-[100%] h-[60vh] pt-[20px] p-[30px]  px-[40px] overflow-y-auto rounded-bl-lg lg:p-[15px] lg:h-[70vh]   ">
        {[...myNote].map((note, index) => (
          <div className="w-[100%]  p-5 text-[16px] mb-[20px] flex flex-row last:mb-0 pb-0 lg:p-0 " key={index}>
            <div className="basis-1/5 text-[18.5px] font-medium lg:text-[13.59px] lg:mt-2 ">
              {note[0]} <br/> {note[1]}
            </div>
            <div className="basis-4/5 text-[18px] leading-[28px] tracking-[3.5%] lg:text-[13px]"> {note[2]}</div>

          </div>
        ))}
      </div>

      <form onSubmit={submitNote} className="w-[100%] h-[26vh] bg-[#E8E8E8] p-[20px] rounded-bl-xl lg:h-[18vh] lg:mt-[5vh] ">
        <textarea
          required
          className="w-[100%] h-[100%] outline-none p-[10px] pl-[30px] text-[16px] rounded-md resize-none  relative placeholder:text-2xl lg:placeholder:text-xl " 
          name="note" 
          id="note"
          onChange={(event) => {
            setAllNotes(event.target.value);
          }}
          value={allNotes}
          placeholder="Enter your text here..........."
        ></textarea>
        <button className="h-max w-max absolute bottom-[-18px] right-[30px] cursor-pointer border-none lg:bottom-[-60px]"> <img src={arrow}  className="lg:h-[17px] lg:w-[21px]" alt="error" /></button>
      </form>
      <div className="bg-white h-[3vh] lg:hidden lg:h-0">
    </div>
    </>
  );
};

const NoteBox = (props) => {
  const [noteGroup, setNoteGroup] = useState(null);

  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(props.selected);

    if (props.selected) {
      // setDisplay(false)
      // document.getElementById('hidden').style.display='block'
      const pocketGroups =
        JSON.parse(localStorage.getItem("pocketGroup")) || [];

      const matchingGroup = pocketGroups.find(
        (group) => group[1] === props.selected
      );
      setNoteGroup(matchingGroup);
    }
  }, [props.selected]);

  return (
    <div className="w-[100%] bg-[#F7ECDC] z-0 font-roboto relative lg:z-0 lg:w-[100vw] lg:fixed lg:top-0" style={{ height: !noteGroup ?"100%" : '90vh' }}  >
      {!noteGroup ? (
        <div className="flex items-center justify-center flex-col  ">
          <img src={Img} alt="Pocket Notes"  className="w-[40%] mt-[20vh]"/>
          <h2 className="text-[50px] font-medium my-[10px] text-center">Pocket Notes</h2>
          <p className="w-max text-center text-[18px] font-[400]">
             Send and receive messages without keeping your phone online. <br />
             Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
          <div className="fixed bottom-[10px] flex flex-row items-center gap-2 lg:hidden"> 
            <img src={lock} alt="error" /> 
            <p>end-to-end encrypted</p>
          </div>
        </div>
      ) : (
        <NoteSection noteGroup={noteGroup} selected={selected || ""} setGoBacks={props.setBack} />
      )}
    </div>
  );
};

export default NoteBox;
// style={ (!noteGroup ? {height:"100%"} : {height : '90vh'} )}