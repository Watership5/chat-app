import { useAuthState } from "react-firebase-hooks/auth"
import { auth, googleAuth } from "../config/firebase"
import { signInWithPopup, signInAnonymously } from "firebase/auth"
const Auth = () => {
  const [user] = useAuthState(auth)
  const signInWithGoogle = async () => {
    try{
      await signInWithPopup(auth, googleAuth)
    } catch(err){
      console.error(err)
    }
  }
  const signInAsGuest = async () => {
    try{
      await signInAnonymously(auth)
    } catch(err){
      console.error(err)
    }
  }
  return (
    <section className="flex flex-col items-center justify-center h-[100vh]  gap-[1rem] w-[100%] text-white text-[30px]">
      <button onClick={signInWithGoogle} className="p-[1rem] bg-black-two">
        Sign in With Google ♾️
      </button>
      <button onClick={signInAsGuest} className="py-[1rem] px-[1.75rem] bg-black-two">
        Sign in as a Guest 😏
      </button>
    </section>
  )
}

export default Auth