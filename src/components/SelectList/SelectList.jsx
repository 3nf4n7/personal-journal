import { useContext } from 'react';
import { ListContext } from '../../context/list.context';
import styles from './SelectList.module.css';

function SelectList() {
	const { listId, setListId } = useContext(ListContext);

	const changeUser = (e) => {
		setListId(Number(e.target.value));
	};

	return (
		<select className={styles['select']} name="list" id="list" value={listId} onChange={changeUser}>
			<option value="1">Важные записи</option>
			<option value="2">Дела</option>
		</select>
	);
}

export default SelectList;