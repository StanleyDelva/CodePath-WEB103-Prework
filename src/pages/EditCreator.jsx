import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { supabase } from '../client';

function EditCreator() {
    const { id } = useParams();
    const [creatorData, setCreatorData] = useState({ Name: "", Image: "", Description: "", yt_handle: "", ig_handle: "", twitter_handle: "" });
    const navigate = useNavigate();

    useEffect(() => {
        fetchCreator();
      }, [id]);

      const fetchCreator = async () => {
        try {
          const response = await supabase.from('creators').select().eq('id',id)
          setCreatorData({ Name: response.data[0].name, Image: response.data[0].imageURL, Description: response.data[0].description, 
            yt_handle: response.data[0].yt_handle, ig_handle: response.data[0].ig_handle, twitter_handle: response.data[0].twitter_handle })
        } catch (error) {
          console.error(error);
        }
      };


    const cancel = () => {
        setCreatorData({ Name: "", Image: "", Description: "", yt_handle: "", ig_handle: "", twitter_handle: "" });
        navigate(`/creators/${id}`);
    };

    const deleteCreator = async () => {
        setCreatorData({ Name: "", Urls: [], Image: "", Description: "" });

        const { error } = await supabase
        .from('creators')
        .delete()
        .eq('id',id)

        navigate('/creators');
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if (creatorData.Name === "" || creatorData.Description === "") {
            alert("Creator's name and a description are required.");
            throw new Error('Creator\'s name and a description not provided');
        }

        if (creatorData.ig_handle === "" && creatorData.yt_handle === "" && creatorData.twitter_handle === "") {
            alert("At least one social media handle is required for each creator.");
            throw new Error('At least one social media handle not provided');
        }

        const { error } = await supabase
        .from('creators')
        .update({name: creatorData.Name, description: creatorData.Description, imageURL: creatorData.Image, yt_handle:creatorData.yt_handle, 
            ig_handle: creatorData.ig_handle, twitter_handle: creatorData.twitter_handle})
        .eq('id',id)
        .then(console.log(creatorData))
        .then(navigate(`/creators/${id}`)); // Redirect to new page

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={creatorData.Name} onChange={(e) => setCreatorData({ ...creatorData, Name:e.target.value})} placeholder='Enter name of creator' />
                    </label>
                </div>
                <div>
                    <label>
                        Image link:
                        <input type="text" value={creatorData.Image} onChange={(e) => setCreatorData({ ...creatorData, Image:e.target.value})} placeholder='Enter link here' />
                    </label>
                </div>

                <div>
                    <label>
                        Description:
                        <input type="text" value={creatorData.Description} onChange={(e) => setCreatorData({ ...creatorData, Description:e.target.value})} placeholder='Enter description here' />
                    </label>
                </div>
                
                <div>
                    <label>
                        Youtube handle:
                        <input type="text" value={creatorData.yt_handle} onChange={(e) => setCreatorData({ ...creatorData, yt_handle:e.target.value})} placeholder='Enter handle here' />
                    </label>
                </div>

                <div>
                    <label>
                        Instagram handle:
                        <input type="text" value={creatorData.ig_handle} onChange={(e) => setCreatorData({ ...creatorData, ig_handle:e.target.value})} placeholder='Enter handle here' />
                    </label>
                </div>

                <div>
                    <label>
                        Twitter handle:
                        <input type="text" value={creatorData.twitter_handle} onChange={(e) => setCreatorData({ ...creatorData, twitter_handle:e.target.value})} placeholder='Enter handle here' />
                    </label>
                </div>

                <div>
                        <div>
                            <button onClick={handleSubmit}>Submit</button>
                        </div>

                        <div>
                            <button type="button"  onClick={cancel}>Cancel</button>
                        </div>

                        <div>
                            <button type="button"  onClick={deleteCreator}>Delete</button>
                        </div>
                </div>

            </form>
        </div>
    )
}


export default EditCreator;