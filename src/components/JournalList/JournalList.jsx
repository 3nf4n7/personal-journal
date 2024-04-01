import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { ListContext } from '../../context/list.context';


function JournalList({ data, setSelectedCard }) {
	const { listId } = useContext(ListContext);

	const filteredItems = useMemo(
		() => data.filter(inf => inf.listId == listId)
		, [data, listId]);

	return (
		<div className='journal-list'>
			{data.length === 0 ? 
				<p> Записей нет </p>
				: filteredItems.map(inf => {
					return (
						<CardButton key={inf.id} onClick={() => setSelectedCard(inf)}>
							<JournalItem
								title={inf.title}
								text={inf.text}
								date={inf.date}
							></JournalItem>
						</CardButton>);
				})}
		</div>
	);
}

export default JournalList;