import SelectList from '../SelectList/SelectList';


function Header() {
	return(
		<>
			<img className="logo" src="/logo.svg" alt="logo"></img>
			<SelectList />
		</>
	);
}

export default Header;