import Header from "./components/Header";
import Clients from "./components/Clients";

import styles from "./app.module.scss";

function App() {
	return (
		<div className={styles.container}>
			<Header />
			<Clients />
		</div>
	);
}

export default App;
