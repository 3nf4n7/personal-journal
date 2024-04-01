import { createContext, useState } from 'react';

export const ListContext = createContext({
	listId: 1
});

export const ListContextProvider = ({ children }) => {
	const [listId, setListId] = useState(1);

	return <ListContext.Provider value={{ listId, setListId }}>
		{ children }
	</ListContext.Provider>;
};