import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./config/firebase"
import ChatApp from "./components/chatApp"
import Auth from "./components/auth"
export default function Home() {
  const [user] = useAuthState(auth)
  return (
    <main className="font-Cubano">
      {user  ? <ChatApp/> : <Auth/>}
    </main>
  )
}
