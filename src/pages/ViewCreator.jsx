import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link    } from 'react-router-dom';
import { supabase } from '../client';
import './ViewCreator.css';


function ViewCreator() {
    const { id } = useParams();
    const [creator, setCreatorData] = useState({ Name: "", Image: "", Description: "", yt_handle: "", ig_handle: "", twitter_handle: "" });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCreator();
      }, [id]);

      const deleteCreator = async () => {
        setCreatorData({ Name: "", Image: "", Description: "", yt_handle: "", ig_handle: "", twitter_handle: "" });

        const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id',id)

        navigate(`/creator/${id}`);
    };

      const fetchCreator = async () => {
        try {
          const response = await supabase.from('creators').select().eq('id',id)
          setCreator(response.data[0]);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <>
            <img src={creator.imageURL}/>
            <h1>{creator.name}</h1>
            <p className='view-creator'>{creator.description}</p>
            <p className='view-creator'>Youtube handle: @{creator.yt_handle}</p>
            <p className='view-creator'>Instagram handle: @{creator.ig_handle}</p>
            <p className='view-creator'>Twitter handle: @{creator.twitter_handle}</p>

            <div className='btn'>
                <Link to={`/edit/${id}`}>
                    <button>Edit</button>
                </Link>
                <Link>
                  <button onClick={deleteCreator}>Delete</button>
                </Link>
                <Link to={'/creators'}>
                    <button>Go back</button>
                </Link>
            </div>
        </>
  
    )
}


export default ViewCreator;