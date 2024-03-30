import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import RightPanel from './layouts/RightPanel/RightPanel';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

function App() {
	const [data, setData] = useState([]);

	const updateJournalForm = (newData) => {
		setData([{
			title: newData.title,
			text: newData.text,
			date: new Date(newData.date),
			id: data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1
		}, ...data]);
	};

	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton></JournalAddButton>
				<JournalList>
					{data.length === 0 ? 
						<p> Записей нет </p>
						: data.map(inf => {
							return (
								<CardButton key={inf.id}>
									<JournalItem
										title={inf.title}
										text={inf.text}
										date={inf.date}
									></JournalItem>
								</CardButton>);
						})}
				</JournalList>
			</LeftPanel>
			<RightPanel>
				<JournalForm updateJournalForm={updateJournalForm} />
			</RightPanel>
			
      
		</div>
	);
}


export default App;
