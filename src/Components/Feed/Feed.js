import React, { useState } from "react" ;
import "./Feed.css"
import apiFile from "../../api.json";
import { ButtonBase, IconButton } from "@material-ui/core";


export default function Feed() {
    const [api, setApi] = useState(apiFile)
    const [show, setShow] = useState(false);
    const [comment, setComment] = useState("");
    const [likeCount, setlikeCount] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [likedUsers, setLikedUsers] = useState([]);
    const [saved, setSaved] = useState(false);

    function countTime(timestamp) {
        const currentTime = new Date().getTime() / 1000;
        const timeDifference = currentTime - timestamp;
      
        if (timeDifference >= 365 * 24 * 60 * 60) {
          return `${Math.floor(timeDifference / (365 * 24 * 60 * 60))} yr ago`;
        } else if (timeDifference >= 30 * 24 * 60 * 60) {
          return `${Math.floor(timeDifference / (30 * 24 * 60 * 60))} mo ago`;
        } else if (timeDifference >= 24 * 60 * 60) {
          return `${Math.floor(timeDifference / (24 * 60 * 60))} d ago`;
        } else {
          return `${Math.floor(timeDifference / (60 * 60))} h`;
        }
    }
    function handleLike(index) {
      let newApi = api

      newApi.record.data[index].user_has_liked = !api.record.data[index].user_has_liked
      if (newApi.record.data[index].user_has_liked) { 
        newApi.record.data[index].likes_count++
      } else {
        newApi.record.data[index].likes_count--
      }
      setApi(newApi);
      setClicked(!clicked)
      console.log(api)
    }

    function handleSave(index) {
      let newApi = api
      newApi.record.data[index].user_has_saved = !api.record.data[index].user_has_saved
      setApi(newApi);
      setSaved(!saved)
    }

    function commentOnChange(e) {
      if (e === "") {
        setShow(false)
      } else {
        setShow(true)
      }
      setComment(e)
    }
    
    
    
    function postComment(index) {
      let commentData = {
        "created_time": Math.floor(Date.now() / 1000),
        "text": comment,
        "from": api.account,
        "id": Math.floor(Math.random() * 10000000000000000000).toString()
      }
      
      let newApi = api
      newApi.record.data[index].comment.push(commentData);
      setApi(newApi);
      setComment('')
      setShow(false)
    }

    return (
        <div id="Feed">
             {api.record.data.map((imagesPost, index) => {
                return (
                    <div key={imagesPost.id} className="thumbnail">
                        <div className="feed-user">
                            <img className="thumbnail-profile" src={imagesPost.user.profile_picture} />
                            <div className="thumbnail-text">{imagesPost.user.username}</div>
                            <div className="post-created">{countTime(imagesPost.created_time)}</div>
                            <div className="button-more-option">
                                <div className="button">
                                <svg aria-label="More options" color="#8e8e8e" fill="#8e8e8e" height="30" role="img" viewBox="0 0 24 24" width="30"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                                </div>
                            </div>
                        </div>
                    
                        <div className="feed-container">
                            <img className="feed-image" src={imagesPost.images.standard_resolution.url} />
                        </div>
                        <div className="feed-action">
                            <div 
                                 onClick={() => handleLike(index)}
                                 className={clicked ? "full-button" : ""}
                                 disabled={likedUsers.includes("current_user")}
                                 style={{cursor: "pointer"}}
                                 >
                                {imagesPost.user_has_liked
                                  ? <svg aria-label="Unlike" style={{marginRight: 20}} color="#ed4956" fill="#ed4956" height="35" role="img" viewBox="0 0 48 48" width="35"><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                                  : <svg aria-label="Like" style={{marginRight: 20}} fill="#262626" color="#262626" height="35" role="img" viewBox="0 0 24 24" width="35" ><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
                                }
                                </div>
                            <div className="comment-button action-item"
                                >
                                <svg aria-label="Comment" color="#262626" fill="#262626" style={{cursor: "pointer"}} height="35" role="img" viewBox="0 0 24 24" width="35"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <div className="share-button action-item">
                                <svg aria-label="Share Post" color="#262626" fill="#262626" style={{cursor: "pointer"}} height="35" role="img" viewBox="0 0 24 24" width="35"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                            </div>
                            <div className="save-button action-item" onClick={() => handleSave(index)}>
                                <svg aria-label="Save" color="#262626" fill="#262626" style={{cursor: "pointer"}} height="35" role="img" viewBox="0 0 24 24" width="35"><polygon fill={imagesPost.user_has_saved ? "rgb(38, 38, 38)" : "none"} color={imagesPost.user_has_saved ? "rgb(38, 38, 38)" : "none"} points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
                            </div>
                        </div>
                            <span key={imagesPost.likes_count} className="totalLikes">{imagesPost.likes_count} likes</span>
                        <div className="feed-comment">
                            <div className="caption"> 
                                <b>{imagesPost.caption.from.username}</b> <span>{imagesPost.caption.text}</span>
                            </div>
                            <span className="translation">See translation</span>
                            {imagesPost.comment.map((comment, index) => {
                              return (
                                <div key={index} className="comment"> 
                                    <b>{comment.from.username}</b> <span>{comment.text}</span>
                                </div>
                              )
                            })}
                            
                            <div className="comment-input-container">
                              
                                <textarea 
                                className="comment-input" 
                                placeholder="Add a comment…" 
                                autoComplete="off" 
                                autoCorrect="off"
                                onChange={(e) => commentOnChange(e.target.value)}
                                >
                              </textarea>
                              
                              {show ? <div className="post-button" onClick={() => postComment(index)}>Post</div> : <div></div>}
                              
                            </div>
                        </div>
                    </div>
                )
            })}
       </div>
    )
}