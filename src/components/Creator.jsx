import { Link } from 'react-router-dom';
import './Creator.css'
import { FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa'



function Creator({ id,imageURL,name,description,yt_handle,ig_handle,twitter_handle }) {

    return (
        <article>
            <div className='image-container'>
                <img src={imageURL} alt=''/>
            </div>
            <div className='card-content'>
                <div className='card-title'>
                    <h3>{name}</h3>
                    <div className='icon-container'>
                        {yt_handle ? (
                            <a href={`https://www.youtube.com/@${yt_handle}`}><FaYoutube/> </a>
                        ) : null}

                        {ig_handle ? (
                            <a href={`https://www.instagram.com/${ig_handle}`}> <FaInstagram/> </a>
                        ) : null}

                        {twitter_handle ? (
                            <a href={`https://twitter.com/${twitter_handle}`}><FaTwitter/> </a>   
                        ) : null}
                    </div>
                </div>
                <div className='card-body'>
                    <div className='description-container'>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
            <div className='btns'>
                <Link to={`/creators/${id}`}>
                    <button>View</button>
                </Link>
                <Link to={`/edit/${id}`}>
                    <button variant="primary">Edit</button>
                </Link>
            </div>

        </article>
    )
}

export default Creator;
