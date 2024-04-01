import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import { INITIAL_STATE, formReducer } from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import { ListContext } from '../../context/list.context.jsx';

function JournalForm({ updateJournalForm, data, deleteCard }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);	
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const { listId } = useContext(ListContext);

	const focusError = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if (!data) {
			dispatchForm({ type: 'RESET' });
			dispatchForm({ type: 'SET_VALUE', payload: { listId }});
		}
		dispatchForm({ type: 'SET_VALUE', payload: { ...data }});
	}, [data, listId]);

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.text || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			updateJournalForm(values);
			dispatchForm({ type: 'RESET' });
			dispatchForm({ type: 'SET_VALUE', payload: { listId }});
		}
	}, [isFormReadyToSubmit, updateJournalForm, values, listId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { listId }});
	}, [listId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });	
	};

	const inputChange = (e) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value}});
	};

	const deleteJournalCard = () => {
		deleteCard();
		dispatchForm({ type: 'RESET' });
		dispatchForm({ type: 'SET_VALUE', payload: { listId }});
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type="text" name="title" ref={titleRef} value={values.title} onChange={inputChange} appearance='title' isValid={isValid.title} />
				{data?.id && <button className={styles['delete']} type="button" onClick={deleteJournalCard}>
					<img src="/archive.svg" alt="Кнопка удалить" />
				</button>}
				
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="" />
					<span>Дата</span>
				</label>
				<Input type="date" name="date" ref={dateRef} id="date" value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} onChange={inputChange} isValid={isValid.date} />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="" />
					<span>Метка</span>
				</label>
				<Input type="text" name="tag" id='tag' value={values.tag} onChange={inputChange} />
			</div>
			<textarea name="text" id="" ref={textRef} cols={30} rows={10} value={values.text} onChange={inputChange} className={`${styles.input} ${formState.isValid.text ? '' : styles['invalid']}`} ></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;
