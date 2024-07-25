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

        if (task.length > 0) {

            setmainTask([...mainTask, { task }])

            settask("")
            saveTo()
        } else {
            alert("Enter Task To Add")
        }
    }
    const deleteHandler = (i) => {
        //delete the task
        if (confirm('Are you sure you want to delete this?')) {
            let copyTask = [...mainTask]
            copyTask.splice(i, 1)
            setmainTask(copyTask)
            saveTo()
        } else {
            //Do nothing
        }

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
                <div key={i} className="main m-2 bg-white flex justify-between rounded-xl" >
                    <div className="overflow-auto mr-2 text-black">
                        <p className='p-3'>{t.task}</p>
                    </div>
                    <div className="btn flex h-full">
                        <button onClick={() => { editHandler(i) }} className='bg-red-600 text-white p-2 m-1 mr-0 rounded-xl'>Edit</button>
                        <button onClick={() => { deleteHandler(i) }} className='bg-red-600 text-white p-2 m-1 rounded-xl'>Delete</button>
                    </div>
                </div>
            )
        })




    return (
        <>
            <div className='w-full h-screen flex justify-center bg-slate-500  '>
                <div className='w-full h-screen bg-slate-600 '>
                    <form className='flex justify-between m-2 gap-2' onSubmit={submitHandler}>
                        <input className='w-full rounded-xl p-1 text-black text-xl' type="text" value={task} onChange={(e) => { settask(e.target.value) }} placeholder='Enter Task' />
                        <button className='font-bold text-white bg-slate-700 rounded-xl p-2 text-xl'>ADD</button>
                    </form>
                    <div className='text-center text-2xl bg-slate-700 rounded-xl m-2 p-1'>
                        <h1 className='text-white font-bold'>All Tasks</h1>
                    </div>
                    <h1 className=''>{renderTask}</h1>
                </div>



            </div>

        </>
    )
}

export default List
