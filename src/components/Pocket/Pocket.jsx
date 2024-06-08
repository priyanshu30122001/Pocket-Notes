import React, { useEffect, useState } from "react";
import NewGroup from "../NewNoteGroup/NewGroup";

const Pocket = (props) => {
  const [noteGroups, setNoteGroups] = useState([]);
  const [selectNote, setSelectNote] = useState("");

  useEffect(() => {
    const allGroups = JSON.parse(localStorage.getItem("pocketGroup")) || [];
    setNoteGroups(allGroups);
  }, []);
   
  const setNote = (name) => {
    setSelectNote(name);
    props.onSubmitApp(name);
   
  };

  
  return (
    <>
      <div className={`flex flex-col items-center justify-center gap-4 pl-4 pt-4 w-[35vw] bg-white overflow-hidden 
                      lg:z-200 lg:w-[100vw] lg:h-[100vh] ${props.isActive ? 'lg:block':'lg:hidden'} `}>
        <div className="w-[100%] flex justify-items-start mb-[2vh] lg:ml-[2vw] lg:mt-[2vh]">
         <h1 className="text-3xl font-medium font-roboto ">Pocket Notes</h1>
        </div>
        <NewGroup newGroup={setNoteGroups} />
        <div className="w-[100%] h-[85vh] overflow-y-auto flex flex-col " id="notes">
          {noteGroups.length !== 0 ? ( " ") :
           ( <div className="flex flex-col items-center justify-center h-[80%] text-slate-500 text-center">
              <img className="h-[50px]" src="https://i.pinimg.com/originals/8a/dd/cd/8addcd0dad97ceac659e066944a771fa.gif" alt="error" />
              <h2 className="text-3xl mb-[2vh] ">Add new note group</h2>
              <p className="text-slate-400 text-lg">No groups available. Click on the create  <br />button to add new group</p>
             </div>
          )}
          {noteGroups.map((group, index) => (
            <div
              className="flex px-[20px] py-[10px] cursor-pointer rounded-l-[32px] "
              style={{
              backgroundColor:selectNote === group[1] ? "#F7ECDC" : "",
              }}
              key={index}
              onClick={() =>
                  {setNote(group[1])
                    props.setActiveIndex(1)
                    // document.getElementById('hidden').style.display='none';
              }}
            >
              <div
                className=" flex items-center justify-center h-[68px] w-[68px] text-[24px] text-white font-medium rounded-full"
                style={{ backgroundColor: group[2] }}
              >
                {group[0]}
              </div>
              <div className="flex items-center justify-center text-[24px] font-medium pl-[30px]">{group[1]}</div>
            </div>
          ))}
          
        </div>
      </div>
    </>
  );
};

export default Pocket;