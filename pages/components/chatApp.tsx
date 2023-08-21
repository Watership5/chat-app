import { signOut } from "firebase/auth"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { auth,db } from "../config/firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect, useRef } from "react"
const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const bar = useRef()
  console.log(input)
  const SignOut = async () => {
    try{
      await signOut(auth)
    } catch(err){
      console.error(err)
    }
  }
  const dummy = useRef()
  const { uid } = auth.currentUser
  const messageCollectionRef = collection(db, "messages")
  const getMessages = async () => {
    try{
      const data = await getDocs(messageCollectionRef)
      const filteredData = data.docs
      .map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      .sort((a, b) => a.createdAt - b.createdAt);
      console.log(filteredData)
      setMessages(filteredData)
      dummy.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'end' });
    } catch(err){
      console.log(err)
    }
  };  
  const sendMessage = async (e) => {
    e.preventDefault();
    if(input.trim() === "" || input === null){
      console.log("blank")
    }
    else{
      try {
        await addDoc(messageCollectionRef, {
          message: input,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
        });
      } catch (err) {
        console.error(err);
      }
      getMessages();
      document.getElementById("input").value = ""
      setInput("")
    }
  };
  useEffect(() => {
    getMessages();
  }, [])
  return (
    <main className="h-[100vh]">
      <nav className="flex items-center justify-between py-[1.5rem] px-[3rem] gap-[1rem] w-[100%] text-white text-[35px]">
        <p className="text-[30px]">ChatApp ✅</p>
        <button onClick={SignOut} className="p-[1rem]">
          ✌️
        </button>
      </nav>
      <div className="h-[72vh] overflow-auto mb-[13rem] flex flex-col gap-[0.75rem] relative">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col relative">
            <p className={message.uid == auth.currentUser?.uid ? "cursor-pointer mr-[3rem] px-[1rem] py-[15px] bg-[#4c956c] text-white w-fit self-end" : "mb-[0.5rem] overflow-y-auto cursor-pointer ml-[3rem] px-[1rem] py-[15px] bg-[#e63946] text-white w-fit"}>{message.message}</p>
            <span ref={dummy} className="">
            </span>
          </div>
        ))}
      </div>
      <form className="flex items-end justify-center w-[100% bottom-[10rem] relative border-white px-[3rem]" onSubmit={sendMessage}>
        <input id="input" ref={bar} type="text" placeholder="Hi Mom!" onChange={(e) => setInput(e.target.value)} className="w-[100%] h-[4rem] pl-[1rem] bg-black-two border-[0px] cursor-pointer outline-none text-white placeholder:text-white placeholder:text-[20px] text-[20px]"/>
        <button className="absolute right-[2.75rem] bottom-[-0.9rem] px-[1rem] py-[1.25rem] text-[35px]">
          🤬
        </button>
      </form>
    </main>
  )
}

export default ChatApp