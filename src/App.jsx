import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import RightPanel from './layouts/RightPanel/RightPanel';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';

function App() {
	const data = [
		{
			title: 'Подготовка к обновлению курсов',
			text: 'Горные походы открывают удивитлельные природные ландшафты',
			date: new Date()
		},
		{
			title: 'Поход в горы',
			text: 'Думфл, что очень много времени',
			date: new Date()
		}
	];

	return (
		<div className='app'>
      <LeftPanel>
        <Header />
        <JournalAddButton></JournalAddButton>
        <JournalList>
          {data.map((inf, i) => {
                  return (
                  <CardButton key={i}>
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
          
      </RightPanel>
			
      
		</div>
	);
}


export default App;
