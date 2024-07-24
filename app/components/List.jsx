'use client'
import React, { useEffect, useState } from 'react'

const List = () => {
    const [task, settask] = useState([])
    const [mainTask, setmainTask] = useState([])

    useEffect(() => {
        let editString = localStorage.getItem("mainTask")
        if (editString) {
            let todo = JSON.parse(localStorage.getItem("mainTask"))
            setmainTask(todo)
        }
    }
        , [])

    const saveTo = () => {
        localStorage.setItem("mainTask", JSON.stringify(mainTask))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        setmainTask([...mainTask, { task }])
        settask("")
        saveTo()
    }
    const deleteHandler = (i) => {
        let copyTask = [...mainTask]
        copyTask.splice(i, 1)
        setmainTask(copyTask)
        saveTo()

    }
    const editHandler = (i) => {
        let copyTask = [...mainTask]
        let editTask = copyTask.splice(i, 1)
        setmainTask(copyTask)
        settask(editTask[0].task)
        saveTo()
    }
    let renderTask = <div className='text-white font-bold text-2xl m-1 pl-3 bg-slate-700 p-1 rounded-xl '>No Task</div>
    if (mainTask.length > 0)
        renderTask = mainTask.map((t, i) => {
            return (
                <div key={i} className="main w-full h-auto bg-white flex justify-between m-1 mt-2 rounded-xl">
                    <div className=" line-clamp-2 h-auto w-full ">
                        <p className='p-1 '>{t.task}</p>
                    </div>
                    <div className="btn flex h-full">
                        <button onClick={() => { editHandler(i) }} className='bg-red-600 text-white rounded m-1 p-1 '>Edit</button>
                        <button onClick={() => { deleteHandler(i) }} className='bg-red-600 text-white rounded m-1 p-1 '>Delete</button>
                    </div>
                </div>
            )
        })




    return (
        <>
            <div className='w-full h-screen flex justify-center bg-slate-500  '>
                <div className='p-2 pt-0 w-full h-screen bg-slate-600 '>
                    <form className='flex justify-between mb-2 m-1' onSubmit={submitHandler}>
                        <input className='w-full p-3 mt-3 rounded-xl' type="text" value={task} onChange={(e) => { settask(e.target.value) }} placeholder='Enter Task' />
                        <button className='font-bold text-white bg-slate-700 p-3 mt-3  rounded-xl ml-2'>ADD</button>
                    </form>
                    <div className='text-center text-2xl bg-slate-700 rounded-xl m-1 p-1'>
                        <h1 className='text-white  font-bold m-1'>All Tasks</h1>
                    </div>
                    <h1 className='w-full'>{renderTask}</h1>
                </div>



            </div>

        </>
    )
}

export default List
