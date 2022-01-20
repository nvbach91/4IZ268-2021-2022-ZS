import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Item from "./Item";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {getDocs, doc, orderBy, query, updateDoc, collection, getFirestore, addDoc, where} from "firebase/firestore";
import {getStorage, uploadBytes, ref, getDownloadURL, deleteObject} from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyDgDQg3Arvw60E0Nlyt445WugFiK9JSc0k",
	authDomain: "webslie00.firebaseapp.com",
	projectId: "webslie00",
	storageBucket: "webslie00.appspot.com",
	messagingSenderId: "664230584819",
	appId: "1:664230584819:web:770e6e8a0a6fd62a053286",
	measurementId: "G-109J05KX1M"
  };

const app = initializeApp(firebaseConfig);

function ImageEditBox({image, deleteImage}) {
	const [remove, setRemove] = useState(false);

	return (<div className={"border border-2 border-black relative"} key={image.id} onMouseEnter={() => setRemove(true)}
	             onMouseLeave={() => setRemove(false)}>
		<img className={"w-full h-32 object-cover"} src={image.url} alt={image.title}/>
		{remove && <div className={"w-full h-full absolute top-0 left-0 bg-black opacity-50"}>
			<span className="material-icons text-white cursor-pointer text-3xl" onClick={deleteImage}>close</span>
		</div>}
	</div>)
}

function App() {
	const [user, setUser] = useState(null)
	const [tab, setTab] = useState("home")
	const [items, setItems] = useState([])
	const [modal, setModal] = useState(false)

	const [spinner, setSpinner] = useState(true)

	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [image, setImage] = useState(null)
	const [price, setPrice] = useState(0)

	const [update, setUpdate] = useState(null) // id of item to update
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// calls when application is loaded
		getAuth(app).onAuthStateChanged(user => {
			setUser(user)
		});
		refetch()
	}, [])

	async function refetch() {
		if (tab === "mine" && user !== null) {
			const data = await getDocs(query(collection(getFirestore(app), "items"), where("user", "==", user.uid), orderBy("createdAt", "desc")))
			setItems(data.docs.map(e => ({...e.data(), id: e.id})))
		} else {
			const data = await getDocs(query(collection(getFirestore(app), "items"), orderBy("createdAt", "desc")))
			console.log(data);
			setItems(data.docs.map(e => ({...e.data(), id: e.id})))
		}
		setSpinner(false)
	}

	async function onTabChange(tab) {
		setTab(tab)
		await refetch()
	}

	function signIn() {
		signInWithPopup(getAuth(app), new GoogleAuthProvider())
			.then(result => {
				setUser(result.user)
			})
	}

	async function logOut() {
		await signOut(getAuth(app))
	}

	const handleTitleChange = event => {
		setTitle(event.target.value)
	}
	const handleDescChange = e => {
		setDesc(e.target.value)
	}
	const handlePriceChange = e => {
		setPrice(Number(e.target.value) || 0)
	}
	const handleImageInput = async e => {
		if (!e.target.files[0].type.startsWith("image/")) {
			return setError("File must be an image")
		}
		let id = "images/" + new Date().toISOString()
		let r = ref(getStorage(app), id)
		let result = await uploadBytes(r, e.target.files[0])
		let img = {ref: result.ref, id: id, url: await getDownloadURL(r)}
		setImage(img)
		e.target.value = null
		return setError(null)
	}

	async function deleteImage(id) {
		await deleteObject(ref(getStorage(app), id))
		setImage(null)
	}

	async function save(e) {
		e.preventDefault() //  for not sending form(do not reload page)

		if (image === null) {
			return setError("Please add an image");
		}
		if (!title) {
			return setError("Please fill the title")
		}
		setError(null)
		setLoading(true)
		let item = {
			title, desc, price, image: image.id, createdAt: new Date().toISOString(), user: user.uid
		}
		if (update !== null) {
			await updateDoc(doc(getFirestore(app), "items", update), item)
		} else {
			await addDoc(collection(getFirestore(app), "items"), item)
		}
		setTitle("")
		setDesc("")
		setPrice(0)
		setImage(null)
		setLoading(false);
		await refetch()
		setUpdate(null)
		setModal(false)
		return true;
	}

	async function edit(item) {
		try {
			setImage({id: item.image, url: await getDownloadURL(ref(getStorage(app), item.image)).catch(undefined)})
		} catch (e) {
			setImage(null)
		}
		setTitle(item.title)
		setDesc(item.desc)
		setPrice(item.price)
		setUpdate(item.id)
		setModal(true);
	}

	function cancel(e) {
		e.preventDefault()
		setTitle("")
		setDesc("")
		setPrice(0)
		setImage(null)
		setModal(false)
		setLoading(false);
		setUpdate(null)
		return true;
	}

	return (<main className="overflow-auto max-h-screen">
		<nav className="p-2 bordered border-2 full-width flex justify-between rounded-2xl m-2 ">
			<div className="p-1">
				<Link to="/" onClick={() => onTabChange("home")} className="font-bold p-2 text-2xl">Home</Link>
				{user !== null &&
					<Link to="/mine" onClick={() => onTabChange("mine")} className="font-bold p-2 text-2xl">My Items</Link>}
			</div>
			{user !== null ?
				<button className="bg-red-500 text-white font-bold py-2 px-4 rounded-xl w-28" onClick={logOut}>Log out</button>
				:
				<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-xl" onClick={signIn}>Sign In</button>}
		</nav>
		{spinner && <div className=" z-50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
			<div
				className="animate-spin w-32 h-32 border-x-8 border-blue-800 rounded-full bg-orange-300 flex justify-center items-center">
				<div className="animate-spin w-16 h-16 rounded-full bg-blue-800"/>
			</div>
		</div>}

		<div className={"flex flex-row w-full flex-wrap items-start"}>
			{items.map(item => <Item item={item} key={item.id} user={user} update={refetch} edit={() => edit(item)}/>)}
		</div>
		{items.length === 0 && <div className="p-2 text-center">No items yet</div>}

		{user &&
			<button className="bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded-xl fixed bottom-4 right-4 w-28"
			        onClick={() => setModal(true)}>
				Create
			</button>}

		{modal && <div className="fixed top-0 left-0 w-full h-full bg-gray-900 z-50">
			<form className="rounded-2xl border-2 border-black w-3/5 h-4/8 p-6 mx-auto my-24 bg-white overflow-auto "
			      onSubmit={save}>
				<h1 className={"text-2xl text-center"}>{update !== null ? "Update item" : "Create new item"}</h1>
				{error && <div className="text-xl bg-red-700 rounded-xl my-4 p-4 text-white">{error}</div>}

				<label>
					<span>Title</span>
					<input type="text" onChange={handleTitleChange} name="title" value={title}
					       className={"border border-1 border-black w-full rounded p-2 mb-2"} required/>

				</label>
				<label>
					<span>Description(Optional)</span>
					<textarea className={"border border-1 border-black w-full rounded p-2 mb-1"} cols="30" rows="5" value={desc}
					          onChange={handleDescChange}/>
				</label>
				<label>
					<span>Price($)</span>
					<input type="number" onChange={handlePriceChange} name="title" value={price}
					       className={"border border-1 border-black w-full rounded p-2 mb-2"} required/>
				</label>
				<label>
					<span>Image</span>
					<br/>
					{!image && <input type="file" id="files" name="files" accept="image/*"
					                  onChange={handleImageInput}/>}
				</label>
				{image && <div className={"grid grid-cols-3 gap-2 my-2"}>
					<ImageEditBox image={image} deleteImage={() => deleteImage(image.id)}/>
				</div>}

				<div className={"flex flex-row justify-between"}>
					<button className="bg-red-500 w-32 rounded-xl p-2 text-white" type="button"
					        onClick={cancel}>Cancel
					</button>
					<button className="bg-blue-500 w-32 rounded-xl p-2 text-white"
					        disabled={loading}>{update ? "Update" : "Save"}</button>
				</div>
			</form>
		</div>}
	</main>);
}

export default App;
