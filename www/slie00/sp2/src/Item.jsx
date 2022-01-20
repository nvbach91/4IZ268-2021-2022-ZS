import {useEffect, useState} from "react";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {getAuth} from "firebase/auth";
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";

export default function Item(props) {
	const [url, setUrl] = useState("");
	const [currentUser, setCurrentUser] = useState({});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [contacts, setContacts] = useState([]);
	const [modalContacts, setModalContacts] = useState(false);
	const [modal, setModal] = useState(false);


	useEffect(() => {
		setCurrentUser((getAuth().currentUser || {}))
		getDownloadURL(ref(getStorage(), props.item.image)).then(setUrl).catch(undefined);
	}, [props])

	const {title, desc, image, price, id, user} = props.item;

	async function contact(e) {
		e.preventDefault()
		setLoading(true);
		await addDoc(collection(getFirestore(), "items", id, "contacts"), {
			email: currentUser.email, name: currentUser.displayName, message, date: new Date().toISOString()
		});
		setModal(false);
		setMessage("");
		setLoading(false);
	}

	async function see() {
		let data = await getDocs(collection(getFirestore(), "items", id, "contacts"));
		setContacts(data.docs.map(doc => doc.data()))
		setModalContacts(true)
	}

	function edit() {
		props.edit()
	}

	async function remove() {
		await deleteDoc(doc(getFirestore(), "items", id));
		console.log("removed")
		props.update()
	}

	function handleMessageInput(e) {
		setMessage(e.target.value);
	}

	function closeModal() {
		setModalContacts(false)
		setLoading(false)
	}

	return (<div className="m-2 item-box bordered border-2 rounded-xl h-96">
		<div className="relative m-0 flex bg-white flex-col w-full flex flex-row justify-between h-full">
			<div className="flex-no-shrink w-full">
				<img alt={image} className="block mx-auto w-auto h-48 object-cover" src={url}/>
			</div>
			<div className="flex card-block relative">
				<div className="p-2">
					<h4 className="font-medium text-2xl mb-3">{title}</h4>
					<p className="leading-normal">{desc}</p>
					<p className="text-sm text-grey block mt-6">Price: {price} $</p>
				</div>
			</div>
			{currentUser.email && currentUser.uid !== user &&
				<button className="bordered border-2 border-black m-1 p-2 rounded-xl bg-green-500"
				        onClick={() => setModal(true)}>
					Contact</button>}
			{currentUser.uid === user && <div className="flex flex-row w-full">
				<button className={"bordered border-2 border-black m-1 p-2 rounded-xl bg-blue-500 w-1/3"}
				        onClick={see}>See applicants
				</button>
				<button className={"w-1/3 bordered border-2 border-black m-1 p-2 rounded-xl bg-yellow-500"}
				        onClick={edit}>Edit
				</button>
				<button className={"w-1/3 bordered border-2 border-black m-1 p-2 rounded-xl bg-red-500"}
				        onClick={remove}>Delete
				</button>
			</div>}
		</div>
		{modalContacts === true && <div className="fixed top-0 left-0 w-full h-full bg-gray-900 z-50">
			<div className="rounded-2xl border-2 border-black w-3/5 h-4/8 p-6 mx-auto my-24 bg-white overflow-auto ">
				<h2 className="text-2xl">Applicants</h2>
				{contacts.length > 0 ? <table className="w-full">
					<thead>
					<tr>
						<th>E-mail</th>
						<th>Name</th>
						<th>Message</th>
						<th>Created</th>
					</tr>
					</thead>
					<tbody className="text-center">
					{contacts.map(c => <tr>
						<td>{c.email}</td>
						<td>{c.name}</td>
						<td>{c.message}</td>
						<td>{new Date(c.date).toLocaleDateString() + " " + new Date(c.date).toLocaleTimeString()}</td>
					</tr>)}
					</tbody>

				</table> : <p>No applicants yet</p>}
				<button className="bordered border-2 border-black p-2 w-1/3 mt-6 rounded-xl bg-green-500"
				        onClick={closeModal}>
					Close
				</button>
			</div>
		</div>}

		{modal && <div className="fixed top-0 left-0 w-full h-full bg-gray-900 z-50">
			<form className="rounded-2xl border-2 border-black w-3/5 h-4/8 p-6 mx-auto my-24 bg-white overflow-auto "
			      onSubmit={contact}>
				<h1 className={"text-3xl text-center"}>Leave a contact</h1>
				<label>
					<span>E-mail</span>
					<input type="text" disabled name="email" value={currentUser.email}
					       className={"border border-1 border-black w-full rounded p-2 mb-2"} required/>
				</label>
				<label>
					<span>Message</span>
					<textarea className={"border border-1 border-black w-full rounded p-2 mb-1"} cols="30" rows="5"
					          value={message}
					          onChange={handleMessageInput}/>
				</label>
				<div className={"flex flex-row justify-between"}>
					<button className="bg-red-500 w-32 rounded-xl p-2 text-white" type="button"
					        onClick={() => setModal(false)}>Cancel
					</button>
					<button className="bg-blue-500 w-32 rounded-xl p-2 text-white" disabled={loading}>Save</button>
				</div>
			</form>
		</div>}
	</div>)
}
