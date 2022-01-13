import {NextPage} from "next";
import {ConnectionManagerContext} from "./connectionManager";


export const withContext(page): NextPage => {
	return () => (
		<ConnectionManagerContext.Consumer>

			</ConnectionManagerContext.Consumer>
	);
}
