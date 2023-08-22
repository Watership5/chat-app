/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { signOut } from "firebase/auth"
import { collection, addDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore"
import { auth,db } from "../config/firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { useState, useEffect, useRef} from "react"
const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [index, setIndex] = useState(null)
  const [counter, setCounter] = useState(1)
  const bar:any = useRef<HTMLInputElement>()
  console.log(input)
  const SignOut = async () => {
    try{
      await signOut(auth)
    } catch(err){
      console.error(err)
    }
  }
  const dummy:any = useRef<HTMLInputElement>()

  const messageCollectionRef = collection(db, "msgs")

  const getMessages = () => {
    const unsubscribe = onSnapshot(messageCollectionRef,
      (snapshot) => {
        const filteredData:any = snapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .sort((a:any, b:any) => a.createdAt - b.createdAt);
        setMessages(filteredData);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }; 
  const sendMessage = async (e:any) => {
    const user = auth.currentUser;
    if (user) {
      const { uid, photoURL } = user;
      setCounter(counter+1)
      dummy.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
            photoURL,
            index: counter
          });
        } catch (err) {
          console.error(err);
        }
        getMessages();
        const input2:any = document.getElementById("input")
        input2.value = ""
        setInput("")
      }
    }
    else{
      console.log("err")
    }
  };
  const deleteMsg = async (id:any, index:any) => {
    setIndex(index)
    try{
      const msg = doc(db, "msgs", id)
      await deleteDoc(msg)
      getMessages()
    }
    catch(err){
      console.error(err)
    }
  }
  useEffect(() => {
    getMessages();
  }, [getMessages])
  return (
    <main className="h-[100vh]">
      <nav className="flex items-center justify-between py-[1.5rem] px-[3rem] pt-[1rem] gap-[1rem] w-[100%] text-white text-[35px]">
        <button className="text-[30px]" onClick={SignOut}>ChatApp ✅</button>
        <button onClick={SignOut} className="p-[1rem]">
          ✌️
        </button>
      </nav>
      <div className="h-[65vh] overflow-auto mb-[13rem] flex flex-col gap-[0.5rem] relative">
        {messages.map((message:any) => (
          <div key={message.id} className="flex flex-col relative">
            <div className={message.uid == auth.currentUser?.uid ? "flex flex-row-reverse items-center" : "flex flex-row items-center"}>
              <p onDoubleClick={() => message.uid === auth.currentUser?.uid ? (e:any) => deleteMsg(message.id, message.index) : null} className={message.uid == auth.currentUser?.uid ? "cursor-pointer mr-[3rem] px-[1rem] py-[15px] bg-[rgba(168,85,247)] text-white w-fit text-[13px] self-end" : "mb-[0.5rem] text-[13px] overflow-y-auto cursor-pointer ml-[3rem] self-start px-[1rem] py-[15px] bg-[#e63946] text-white w-fit"}>{message.message}</p>
              <img src={message.photoURL || 'https://wallpapers-clan.com/wp-content/uploads/2022/12/anonymous-pfp-36.jpg'} alt="" width={50} className={message.uid == auth.currentUser?.uid ? "h-fit self-end border-[rgba(168,85,247)] border-[.134rem] mr-[10px] float-right" : "h-fit self-start border-[#e63946] border-[.134rem] ml-[10px] float-right"}/>
            </div>
          </div>
        ))}
        <span className="text-transparent text-[20px]">
          hi
        </span>
        <span ref={dummy} className="text-transparent text-[20px]">
          asd
        </span>
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