import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordsArray, setpasswordsArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        console.log(passwords)
        setpasswordsArray((passwords))
    }
    
    useEffect(() => {
        getPasswords()

    }, [])
    const copyText = (text) => {
        // alert("copied to clipboard" + text)
        toast('🦄 Copied to clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    const ref = useRef()
    const passwordRef = useRef()
    const showPassword = () => {
        // alert("Password shown")
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/eyecross.png")) {

            ref.current.src = "/eye.png"
            passwordRef.current.type = "text"

        }
        else {
            ref.current.src = "/eyecross.png"
            passwordRef.current.type = "password"

        }
    }
    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length && form.password.length > 3) {
            
            const newPassword = { ...form, id: uuidv4() };
            setpasswordsArray([...passwordsArray, newPassword])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPassword)
         })
            // localStorage.setItem("password", JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordsArray, form])
            setForm({ site: "", username: "", password: "" })


            toast('Password saved! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }
        else {
            toast.error('Please fill all the fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });

        }

    }
    const editPassword = (id) => {
        console.log("edit password with id", id)
        setForm({...passwordsArray.filter(i => i.id === id)[0] , id: id})
        setpasswordsArray(passwordsArray.filter(item => item.id !== id))
        // setpasswordsArray([...passwordsArray, {...form, id:uuidv4()}])
        // localStorage.setItem("password", JSON.stringify([...passwordsArray, form]))
        // console.log([...passwordsArray, form])
    }
    const deletePassword = async (id) => {
        console.log("deleting password with id", id)
        let confirm = window.confirm("Are you sure you want to delete this password?")
        if (confirm) {


            setpasswordsArray(passwordsArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        }
        toast('🦄 Last Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });

        // setpasswordsArray([...passwordsArray, {...form, id:uuidv4()}])
        // localStorage.setItem("password", JSON.stringify([...passwordsArray, form]))
        // console.log([...passwordsArray, form])
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />

            <ToastContainer />
            <div><div className="absolute inset-0 -z-10 roll w-full min-h-full custom-background items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
            </div>
                <div className="md:container mx-auto">
                    <h1 className='text-white text-3xl font-bold text-center mb-8 heading'>NewPass - Password Manager</h1>
                    <p className='text-white semi'>Keep your password Accessible with NewPass password Manager</p>
                </div>
                <div className='text-white flex flex-col p-4 justify-center items-center '>
                    <input type="text" value={form.site} onChange={handleChange} placeholder='Enter URL' className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 md:w-2xl loco " name='site' />

                    <div className="flex ">
                        <input type="text" value={form.username} onChange={handleChange} placeholder='Enter Username' className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 md:w-2xs w-32 poco " name='username' />
                        <div className='relative'>
                            <input ref={passwordRef} type="password" value={form.password} onChange={handleChange} placeholder='Enter Password' className="bg-gray-900 text-white placeholder-gray-400 border border-gray-700 rounded-lg p-9 focus:outline-none focus:ring-2 focus:ring-purple-500 md:w-2xs w-32 soso " name='password' />
                            <span className='absolute right-3 top-5 text-transparent pad z-10  cursor-pointer' onClick={showPassword}>
                                <img ref={ref} width={20} src="/eye.png" alt="Toggle visibility" />
                            </span>

                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-purple-500 rounded-full w-40 h-11 solo  border-purple-500 hover:font-bold hover:cursor-pointer' ><lord-icon
                        src="https://cdn.lordicon.com/vjgknpfx.json"
                        trigger="hover"
                    >
                    </lord-icon>Save Password</button>
                    <div className="passwords overflow-x-auto w-full">
                        <h1 className='pass text-2xl py-4'>Your Passwords</h1>
                        {passwordsArray.length === 0 && <div>No Passwords Saved</div>}
                        {passwordsArray != 0 &&

                            <table className="table-auto md:w-full max-w-[500px]">
                                < thead className='bg-pink-700 md:w-full w-32'>
                                    <tr className='md:w-full w-32'>
                                        < th className='py-2 '>Website</ th>
                                        < th className='py-2 '>Username</ th>
                                        < th className='py-2 '>Password</ th>
                                        < th className='hidden md:table-cell py-2'>Actions</ th>
                                    </tr>
                                </ thead>
                                <tbody className='bg-pink-100 text-black md:w-full w-32'>
                                    {passwordsArray.map((item, index) => {
                                        return <tr key={index}>



                                            <td className=' py-2 text-center md:w-full w-28  break-words whitespace-normal overflow-hidden
 '>
                                                <div className='flex justify-center items-center  '><a href={item.site} className='break-words w-full' target='_blank'>{item.site}</a>
                                                    <div className="cursor-pointer moint" onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "23px", "height": "23px" }}
                                                            src="https://cdn.lordicon.com/jestaxpl.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#242424"
                                                        >
                                                        </lord-icon>
                                                    </div>
                                                </div>



                                            </td >
                                            <td className='py-2 text-center md:w-full w-28  break-words whitespace-normal overflow-hidden
'>
                                                <div className='flex items-center justify-center'> <span className='break-words w-full'>{item.username}</span>
                                                    <div className="cursor-pointer joint" onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "23px", "height": "23px" }}
                                                            src="https://cdn.lordicon.com/jestaxpl.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#242424"
                                                        >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td >
                                            <td className='py-2 text-center md:w-full w-28  break-words whitespace-normal overflow-hidden'>
                                                <div className='flex items-center justify-center'> <span className='break-words w-full'>{item.password}</span>
                                                    <div className="cursor-pointer point" onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ "width": "23px", "height": "23px" }}
                                                            src="https://cdn.lordicon.com/jestaxpl.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#242424"
                                                        >
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td >
                                            <td className='hidden md:table-cell py-2 text-center min-w-[100px] max-w-[100px]'>
                                                <div className="flex justify-center gap-2">

                                                    <span className='cursor-pointer ' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#000000"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/jzinekkv.json"
                                                            trigger="hover"
                                                            colors="primary:#121331,secondary:#000000"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </span>
                                                </div>

                                            </td >
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        }





                    </div>


                </div>


            </div>

        </>
    )
}

export default Manager
