import styles from './JournalForm.module.css';
import Button from '../Button/Button';
import { useState } from 'react';
import cn from 'classnames';

function JournalForm({ updateJournalForm }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true
	});

	let isFormValid = true;

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		if (!formProps.title?.trim().length) {
			setFormValidState(state => ({...state, title: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
			isFormValid = true;
		}
		if (!formProps.text?.trim().length) {
			setFormValidState(state => ({...state, text: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
			isFormValid = true;
		}
		if (!formProps.date) {
			setFormValidState(state => ({...state, date: false}));
			isFormValid = false;
		} else {
			setFormValidState(state => ({...state, title: true}));
			isFormValid = true;
		}
		if (isFormValid) {
			updateJournalForm(formProps);
			e.target.reset();
		}
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<input type="text" name="title" className={cn(styles['input-title'], cn(styles['form-label']), {
					[styles['invalid']]: !formValidState.title
				})} ></input>
				<img src="/archive.svg" alt="" />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="" />
					<span>Дата</span>
				</label>
				<input type="date" name="date" id="date" className={`${styles.input} ${formValidState.date ? '' : styles['invalid']}`}/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/folder.svg" alt="" />
					<span>Метка</span>
				</label>
				<input type="text" name="tag" className={styles.input} />
			</div>
			<textarea name="text" id="" cols={30} rows={10} className={`${styles.input} ${formValidState.text ? '' : styles['invalid']}`} ></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;
