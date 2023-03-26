import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, getAllPosts,postAdded } from './postsSlice'
import { getPostsStatus, getPostsErr } from './postsSlice'
import axios from 'axios'
import { useEffect } from 'react'
const PostList = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const posts = useSelector(getAllPosts)
    const dispatch = useDispatch()
    const postsStatus = useSelector(getPostsStatus)
    const postsErr = useSelector(getPostsErr)
    useEffect(()=>{
        if(postsStatus=="idle") dispatch(fetchPosts())
    },[postsStatus,dispatch])
    const submit = ()=>{
        let canValidate = Boolean(title) && Boolean(content);
        if(canValidate) dispatch(postAdded(title, content))
    }
    const renderPosts = posts.map(post => {
        return (
            <article key={post.id}>
                <h3>{post.titre}</h3>
            </article>
        )
    })
    return (
        <section>
            <h2>Posts</h2>
            <input type="text" placeholder='title' onChange={e=>setTitle(e.target.value)} />
            <input type="text" placeholder='content' onChange={e=>setContent(e.target.value)} />
            <button onClick={submit}>submit</button>
            {renderPosts}
        </section>
    )
}
export default PostList
