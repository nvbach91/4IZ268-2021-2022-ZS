import './App.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Item from "./Item";
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import {getDocs, orderBy, query, collection, getFirestore, connectFirestoreEmulator, addDoc} from 'firebase/firestore';
import {connectStorageEmulator, getStorage, uploadBytes, ref, getDownloadURL, deleteObject} from 'firebase/storage'

const firebaseConfig = {
	apiKey: "AIzaSyDa6GnHydWGTKGuVTepwBFqYQE5O8YPcw4",
	authDomain: "marketplace-6f10d.firebaseapp.com",
	projectId: "marketplace-6f10d",
	storageBucket: "marketplace-6f10d.appspot.com",
	messagingSenderId: "27510960861",
	appId: "1:27510960861:web:0c026a41421bda2a142134",
	measurementId: "G-WM1LB2XW7L"
};

const app = initializeApp(firebaseConfig);
connectFirestoreEmulator(getFirestore(app), 'localhost', 8080);
connectStorageEmulator(getStorage(app), 'localhost', 9199);

function ImageEditBox({image, deleteImage}) {
	const [remove, setRemove] = useState(false);
	return (
		<div className={'border border-2 border-black relative'} key={image.id} onMouseEnter={() => setRemove(true)}
		     onMouseLeave={() => setRemove(false)}>
			<img className={'w-full h-32 object-cover'} src={image.url} alt={image.title}/>
			{remove && <div className={'w-full h-full absolute top-0 left-0 bg-black opacity-50'}>
				<span className="material-icons text-white cursor-pointer text-3xl" onClick={deleteImage}>close</span>
			</div>}
		</div>
	)
}

function App(props) {
	const [user, setUser] = useState(null)
	const [tab, setTab] = useState('home')
	const [items, setItems] = useState([])
	const [modal, setModal] = useState(true)
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [price, setPrice] = useState(0)
	const [images, setImages] = useState([])
	const [update, setUpdate] = useState(null)
	useEffect(() => {
		getAuth(app).onAuthStateChanged(user => {
			setUser(user)
		});
		(async () => {
			const data = await getDocs(query(collection(getFirestore(app), 'items'), orderBy('createdAt', 'desc')))
			setItems(data.docs.map(e => ({...e.data(), id: e.id})))
		})();
	}, [])

	const onTabChange = tab => {
		setTab(tab)
	}
	const signIn = () => {
		signInWithPopup(getAuth(app), new GoogleAuthProvider())
			.then(result => {
				setUser(result.user)
			})
	}
	const logOut = async () => {
		await signOut(getAuth(app))
	}

	const handleTitleChange = e => {
		setTitle(e.target.value)
	}
	const handleDescChange = e => {
		setDesc(e.target.value)
	}
	const handlePriceChange = e => {
		setPrice(Number(e.target.value) || 0)
	}
	const handleImageInput = async e => {
		let imgs = []
		for (let image of e.target.files) {
			let id = new Date().toISOString()
			let r = ref(getStorage(app), id)
			let result = await uploadBytes(r, image)
			console.log(result)
			imgs.push({ref: result.ref, id: id, url: await getDownloadURL(r)})
		}
		setImages(images => [...images, ...imgs].splice(0, 6))
		e.target.value = null
	}

	const deleteImage = async (id) => {
		await deleteObject(ref(getStorage(app), id))
		setImages(images => images.filter(e => e.id !== id))
	}

	const save = async () => {
		let item = {
			title,
			desc,
			price,
			images: images.map(i => i.id),
			createdAt: new Date().toISOString(),
			user: user.uid
		}

		addDoc(getFirestore(app), 'items').set(item)
		setTitle('')
		setDesc('')
		setPrice(0)
		setImages([])
		setModal(false)
	}

	return (
		<main>
			<nav className="p-2 bordered border-2 full-width flex justify-between rounded-2xl m-2">
				<div className="p-1">
					<Link to="/" onClick={() => onTabChange('home')} className="font-bold p-2 text-2xl">Home</Link>
					{user &&
						<Link to="/items" onClick={() => onTabChange('mine')} className="font-bold p-2 text-2xl">My Items</Link>}
				</div>
				{user ?
					<button className='bg-red-500 text-white font-bold py-2 px-4 rounded-xl w-28'
					        onClick={logOut}>Log out</button>
					:
					<button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-xl' onClick={signIn}>Sign In</button>
				}
			</nav>
			<div className={'flex flex-row px-12'}>
				{items.map(item => {
					return (<Item item={item} key={item.id}/>)
				})}
			</div>
			<button className='bg-blue-500 text-white font-bold py-2 px-4 rounded-xl fixed bottom-4 right-4 w-28'>Create
			</button>

			{modal && <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-75">
				<form className='rounded-2xl border-2 border-black w-3/5 h-4/8 p-6 mx-auto my-24 bg-white overflow-auto '>
					<h1 className={'text-2xl text-center'}>Create new item</h1>

					<label>
						<span>Title</span>
						<input type="text" onChange={handleTitleChange} name="title" value={title}
						       className={'border border-1 border-black w-full rounded p-2 mb-2'}/>

					</label>
					<label>
						<span>Description</span>
						<textarea className={'border border-1 border-black w-full rounded p-2 mb-1'} cols="30" rows="5" value={desc}
						          onChange={handleDescChange}/>
					</label>
					<label>
						<span>Price($)</span>
						<input type="number" onChange={handlePriceChange} name="title" value={price}
						       className={'border border-1 border-black w-full rounded p-2 mb-2'}/>
					</label>
					<label>
						<span>Images</span>
						<br/>
						{images.length < 6 ?
							<input type="file" id="files" name="files" accept="image/png, image/gif, image/jpeg" multiple
							       onChange={handleImageInput}/> : 'You can have up to 6 images'}
					</label>
					<div className={'grid grid-cols-3 gap-2 my-2'}>
						{images.map(e => <ImageEditBox image={e} key={e.id} deleteImage={() => deleteImage(e.id)}/>)}
					</div>

					<div className={'flex flex-row justify-between'}>
						<button className='bg-red-500 w-32 rounded-xl p-2 text-white'>Cancel</button>
						<button className='bg-blue-500 w-32 rounded-xl p-2 text-white' onClick={save}>Save</button>
					</div>
				</form>
			</div>}
		</main>
	);
}

export default App;
