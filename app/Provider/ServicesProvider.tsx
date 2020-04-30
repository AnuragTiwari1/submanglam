import React from "react"
import { API_URL } from "react-native-dotenv"
import { UseFetchProvider } from "use-fetch-lib"
import {observer} from "mobx-react-lite"
import {useStores} from "../models/root-store"

export const ServicesProvider = observer(({children}) => {
	const {authStore}=useStores()
	console.log('the auth url>>>>>>>',API_URL)
	return (
		<UseFetchProvider baseUrl={API_URL} authorizationToken={() => `Bearer ${authStore.token}`}>
			{children}
    </UseFetchProvider>
  )
})
