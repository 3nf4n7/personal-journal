import './App.css';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import RightPanel from './layouts/RightPanel/RightPanel';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage.hook';
import { ListContextProvider } from './context/list.context';
import { useState } from 'react';


function mapData(data) {
	if (!data) {
		return [];
	}

	return data.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [data, setData] = useLocalStorage('data');
	const [selectedCard, setSelectedCard] = useState(null);

	const updateJournalForm = (newData) => {
		if (!newData.id) {
			setData([{
				...newData,
				date: new Date(newData.date),
				id: data?.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1
			}, ...mapData(data)]);
		} else {
			setData([...mapData(data).map(i => {
				if (i.id === newData.id) {
					return {
						...newData
					};
				}
				return i;
			})]);
		}
	};


	const deleteCard = () => {
		setData([...data.filter(card => card.id !== selectedCard.id)]);
		setSelectedCard(null);
	};

	return (
		<ListContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedCard(null)}></JournalAddButton>
					<JournalList data={mapData(data)} setSelectedCard={setSelectedCard} />
				</LeftPanel>
				<RightPanel>
					<JournalForm updateJournalForm={updateJournalForm} data={selectedCard} deleteCard={deleteCard} />
				</RightPanel>
			</div>
		</ListContextProvider>
	);
}


export default App;
