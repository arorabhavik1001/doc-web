"use client"

import Header from "../components/header"
import HomeBody from "../components/homebody"
import Login from "../components/Login"
import { getSession, useSession }  from "next-auth/react"

function getSessionDetails() {
  var { data: session, status } = useSession()
  return session
}

export default  function Home() {
  const session =  getSessionDetails()
  if(!session) {
    return <Login />;
  } else {
    return (
      <>
        <Header />
        <HomeBody />
      </>
    )
  }

}